from flask import Flask,request,jsonify,session,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from datetime import datetime
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
app.secret_key = os.urandom(24)
# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/Electric_Vehicles'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Define SQLAlchemy models
class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    full_name = db.Column(db.String(100))
    role = db.Column(db.String(20))

    def serialize(self):
        return {
            'user_id': self.user_id,
            'username': self.username,
            'password': self.password,
            'email': self.email,
            'full_name': self.full_name,
            'role':self.role
        }
class Vehicle(db.Model):
    __tablename__ = 'vehicles'

    vehicle_id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    battery_capacity = db.Column(db.Integer, nullable=False)
    range_km = db.Column(db.Integer, nullable=False)
    charging_time = db.Column(db.Float, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    availability = db.Column(db.String(20), default='available')

    def serialize(self):
        return {
            'vehicle_id': self.vehicle_id,
            'make': self.make,
            'model': self.model,
            'year': self.year,
            'better_capacity': self.battery_capacity,
            'range_km': self.range_km,
            'charging_time':self.charging_time,
            'price':self.price,
            'availability': self.availability
        }
class ChargingStation(db.Model):
    __tablename__ = 'chargingstations'

    station_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    charger_type = db.Column(db.String(20), nullable=False)
    availability = db.Column(db.String(20), default='available')
    pricing = db.Column(db.Numeric(10, 2))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'station_id': self.station_id,
            'name': self.name,
            'location': self.location,
            'charger_type': self.charger_type,
            'availability': self.availability,
            'pricing':self.pricing,
        }
class Review(db.Model):
    __tablename__ = 'reviews'

    review_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicles.vehicle_id'))
    station_id = db.Column(db.Integer, db.ForeignKey('chargingstations.station_id'))
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'review_id': self.review_id,
            'username': self.username,
            'vehicle': self.vehicle,
            'station_name': self.station_name,
            'rating': self.rating,
            'review_text': self.review_text,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'created_at': self.created_at
        }
    
# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    full_name = data.get('full_name')
    role = data.get('role', 'select')  # Default role to 'select'

    if not username or not password or not email:
        return jsonify({'error': 'Missing required fields'}), 400

    new_user = User(username=username, password=password, email=email, full_name=full_name, role=role)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    user = User.query.filter_by(username=username,password=password).first()

    if user:
        return jsonify({'message': 'Login successful', 'role': user.role})
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/api/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/vehicles', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([vehicle.serialize() for vehicle in vehicles])

@app.route('/api/admin/vehicles', methods=['GET'])
def get_admin_vehicles():
    vehicles = Vehicle.query.all()
    return jsonify([vehicle.serialize() for vehicle in vehicles])

@app.route('/api/admin/vehicles/<int:vehicle_id>', methods=['PUT'])
def update_vehicle(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    data = request.json
    vehicle.make = data['make']
    vehicle.model = data['model']
    vehicle.year = data['year']
    vehicle.battery_capacity = data['battery_capacity']
    vehicle.range_km = data['range_km']
    vehicle.charging_time = data['charging_time']
    vehicle.price = data['price']
    vehicle.availability = data.get('availability', 'available')  # Default 'availability' to 'available' if not provided
    db.session.commit()
    return jsonify(message='Vehicle updated successfully')

@app.route('/api/admin/vehicles/<int:vehicle_id>', methods=['DELETE'])
def delete_vehicle(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    db.session.delete(vehicle)
    db.session.commit()
    return jsonify(message='Vehicle deleted successfully')

@app.route('/api/chargingstations', methods=['GET'])
def get_charging_stations():
    stations = ChargingStation.query.all()
    return jsonify([station.serialize() for station in stations])

@app.route('/api/admin/chargingstations', methods=['GET'])
def get_admincharging_stations():
    stations = ChargingStation.query.all()
    return jsonify([station.serialize() for station in stations])

# Add new charging station
@app.route('/api/admin/chargingstations', methods=['POST'])
def admin_add_charging_station():
    data = request.get_json()
    
    name = data.get('name')
    location = data.get('location')
    charger_type = data.get('charger_type')
    availability = data.get('availability')
    pricing = data.get('pricing')
    
    new_charging_station = ChargingStation(
        name=name,
        location=location,
        charger_type=charger_type,
        availability=availability,
        pricing=pricing,
        created_at=datetime.utcnow()
    )
    
    db.session.add(new_charging_station)
    try:
        db.session.commit()
        return jsonify({'message': 'Charging station added successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update charging station
@app.route('/api/admin/chargingstations/<int:station_id>', methods=['PUT'])
def admin_update_charging_station(station_id):
    station = ChargingStation.query.get(station_id)
    if not station:
        return jsonify(error='Charging station not found'), 404

    data = request.json
    station.name = data.get('name', station.name)
    station.location = data.get('location', station.location)
    station.charger_type = data.get('charger_type', station.charger_type)
    station.availability = data.get('availability', station.availability)
    station.pricing = data.get('pricing', station.pricing)
    
    db.session.commit()
    return jsonify(message='Charging station updated successfully')

# Delete charging station
@app.route('/api/admin/chargingstations/<int:station_id>', methods=['DELETE'])
def admin_delete_charging_station(station_id):
    station = ChargingStation.query.get(station_id)
    if not station:
        return jsonify(error='Charging station not found'), 404

    db.session.delete(station)
    db.session.commit()
    return jsonify(message='Charging station deleted successfully')

# Get all reviews (for admins)
@app.route('/api/admin/reviews', methods=['GET'])
def admin_get_reviews():
    try:
        reviews = Review.query.order_by(Review.created_at.desc()).all()
        return jsonify([review.serialize() for review in reviews])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/reviews/<int:review_id>', methods=['DELETE'])
def admin_delete_review(review_id):
    try:
        review = Review.query.get(review_id)
        if not review:
            return jsonify({'error': 'Review not found'}), 404
        db.session.delete(review)
        db.session.commit()
        return jsonify({'message': 'Review deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/reviews', methods=['POST'])
def post_review():
    data = request.json
    new_review = Review(
        username=data['username'],
        vehicle=data['vehicle'],
        station_name=data['station_name'],
        rating=data['rating'],
        review_text=data['review_text']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review submitted successfully'}), 201

# Get all contact messages (for admins)
@app.route('/api/admin/contact-messages', methods=['GET'])
def admin_get_contact_messages():
    messages = ContactMessage.query.all()
    return jsonify([message.serialize() for message in messages])

# Delete contact message (for admins)
@app.route('/api/admin/contact-messages/<int:message_id>', methods=['DELETE'])
def admin_delete_contact_message(message_id):
    message = ContactMessage.query.get(message_id)
    if not message:
        return jsonify(error='Contact message not found'), 404

    db.session.delete(message)
    db.session.commit()
    return jsonify(message='Contact message deleted successfully')


# Run the server
if __name__ == '__main__':
    app.run(debug=True)


