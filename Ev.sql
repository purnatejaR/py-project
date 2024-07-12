CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    user_type VARCHAR(20) CHECK (user_type IN ('owner', 'buyer', 'admin')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    battery_capacity INT NOT NULL, -- in kWh
    range_km INT NOT NULL, -- range in kilometers
    charging_time FLOAT NOT NULL, -- in hours
    price DECIMAL(10, 2) NOT NULL,
    availability VARCHAR(20) CHECK (availability IN ('available', 'unavailable')) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ChargingStations (
    station_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    charger_type VARCHAR(20) CHECK (charger_type IN ('Level 1', 'Level 2', 'DC Fast')) NOT NULL,
    availability VARCHAR(20) CHECK (availability IN ('available', 'unavailable')) DEFAULT 'available',
    pricing DECIMAL(10, 2), -- price per kWh or session
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    vehicle_id INT,
    station_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
    FOREIGN KEY (station_id) REFERENCES ChargingStations(station_id)
);

CREATE TABLE AdminActivities (
    activity_id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    target_id INT,
    target_type VARCHAR(20) CHECK (target_type IN ('vehicle', 'station', 'review')) NOT NULL,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);
ALTER TABLE Reviews
    ADD CONSTRAINT fk_user_review FOREIGN KEY (user_id) REFERENCES Users(user_id),
    ADD CONSTRAINT fk_vehicle_review FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
    ADD CONSTRAINT fk_station_review FOREIGN KEY (station_id) REFERENCES ChargingStations(station_id);

ALTER TABLE AdminActivities
    ADD CONSTRAINT fk_admin_activity FOREIGN KEY (admin_id) REFERENCES Users(user_id);

CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_vehicles_make_model ON Vehicles(make, model);
CREATE INDEX idx_stations_location ON ChargingStations(location);

INSERT INTO Users (username, password, email, full_name, user_type)
VALUES
    ('john_doe', 'password123', 'john.doe@example.com', 'John Doe', 'owner'),
    ('jane_smith', 'password456', 'jane.smith@example.com', 'Jane Smith', 'buyer'),
    ('admin_user', 'adminpass', 'admin@example.com', 'Admin User', 'admin');

INSERT INTO Vehicles (make, model, year, battery_capacity, range_km, charging_time, price)
VALUES
    ('Tesla', 'Model S', 2023, 100, 400, 8.5, 80000.00),
    ('Chevrolet', 'Bolt EV', 2022, 66, 320, 9.0, 35000.00),
    ('Nissan', 'Leaf', 2023, 40, 270, 7.5, 30000.00);

INSERT INTO ChargingStations (name, location, charger_type, pricing)
VALUES
    ('City Center Charging Station', '123 Main St, City, State', 'Level 2', 0.25),
    ('Highway Rest Stop Charging', '456 Highway Ave, State', 'DC Fast', 0.30),
    ('Suburban Mall Charging', '789 Shopping Blvd, Suburb, State', 'Level 1', 0.15);

INSERT INTO Reviews (user_id, vehicle_id, station_id, rating, review_text)
VALUES
    (1, 1, 1, 4, 'Great car, good range and performance.'),
    (2, 2, NULL, 5, 'Excellent electric vehicle, very reliable.'),
    (3, NULL, 2, 3, 'Charging station was convenient but a bit pricey.');

INSERT INTO AdminActivities (admin_id, action, target_id, target_type)
VALUES
    (3, 'Added new vehicle', 2, 'vehicle'),
    (3, 'Updated charging station details', 1, 'station'),
    (3, 'Deleted review', 3, 'review');



