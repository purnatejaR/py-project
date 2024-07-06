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
        
