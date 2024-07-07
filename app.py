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

# Define the EV model
class EV(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100))
    model = db.Column(db.String(100))
    year = db.Column(db.Integer)
    battery_capacity = db.Column(db.Float)
    range = db.Column(db.Float)
    charging_time = db.Column(db.Float)
    price = db.Column(db.Float)

    def __init__(self, make, model, year, battery_capacity, range, charging_time, price):
        self.make = make
        self.model = model
        self.year = year
        self.battery_capacity = battery_capacity
        self.range = range
        self.charging_time = charging_time
        self.price = price
# EV Schema
class EVSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = EV

# Initialize schema
ev_schema = EVSchema()
evs_schema = EVSchema(many=True)

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

