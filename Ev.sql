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
