from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Optionally enable CORS if needed

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin@localhost/Electric_Vehicles'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)

@app.route('/')
def index():
    return 'Hello, World!'

# # Define SQLAlchemy models
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

    user = db.relationship('User', backref='reviews')
    vehicle = db.relationship('Vehicle', backref='reviews')
    charging_station = db.relationship('ChargingStation', backref='reviews')

class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Create an EV
@app.route('/ev', methods=['POST'])
def add_ev():
    make = request.json['make']
    model = request.json['model']
    year = request.json['year']
    battery_capacity = request.json['battery_capacity']
    range = request.json['range']
    charging_time = request.json['charging_time']
    price = request.json['price']

    new_ev = EV(make, model, year, battery_capacity, range, charging_time, price)
    db.session.add(new_ev)
    db.session.commit()

    return ev_schema.jsonify(new_ev)

# Get all EVs
@app.route('/ev', methods=['GET'])
def get_evs():
    all_evs = EV.query.all()
    result = evs_schema.dump(all_evs)
    return jsonify(result)

# Get a single EV
@app.route('/ev/<id>', methods=['GET'])
def get_ev(id):
    ev = EV.query.get(id)
    return ev_schema.jsonify(ev)

# Update an EV
@app.route('/ev/<id>', methods=['PUT'])
def update_ev(id):
    ev = EV.query.get(id)

    make = request.json['make']
    model = request.json['model']
    year = request.json['year']
    battery_capacity = request.json['battery_capacity']
    range = request.json['range']
    charging_time = request.json['charging_time']
    price = request.json['price']

    ev.make = make
    ev.model = model
    ev.year = year
    ev.battery_capacity = battery_capacity
    ev.range = range
    ev.charging_time = charging_time
    ev.price = price

    db.session.commit()
    return ev_schema.jsonify(ev)

# Delete an EV
@app.route('/ev/<id>', methods=['DELETE'])
def delete_ev(id):
    ev = EV.query.get(id)
    db.session.delete(ev)
    db.session.commit()
    return ev_schema.jsonify(ev)

# Run the server
if __name__ == '__main__':
    app.run(debug=True)


