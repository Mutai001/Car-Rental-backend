-- 002_create_tables.sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  contact_phone VARCHAR(20),
  address TEXT,
  role user_role DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vehicle_specifications (
  vehicle_id SERIAL PRIMARY KEY,
  manufacturer VARCHAR(100),
  model VARCHAR(100),
  year INTEGER,
  fuel_type VARCHAR(50),
  engine_capacity NUMERIC,
  transmission VARCHAR(50),
  seating_capacity INTEGER,
  color VARCHAR(50),
  features TEXT
);

CREATE TABLE vehicles (
  vehicle_spec_id SERIAL PRIMARY KEY,
  vehicle_id INTEGER REFERENCES vehicle_specifications(vehicle_id),
  rental_rate NUMERIC,
  availability BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE bookings (
  booking_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  vehicle_id INTEGER REFERENCES vehicle_specifications(vehicle_id),
  location_id INTEGER REFERENCES locations(location_id),
  booking_date DATE,
  return_date DATE,
  total_amount NUMERIC,
  booking_status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payments (
  payment_id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(booking_id),
  amount NUMERIC,
  payment_status VARCHAR(20) DEFAULT 'Pending',
  payment_date TIMESTAMP,
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE authentication (
  auth_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE customer_support_tickets (
  ticket_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  subject VARCHAR(255),
  description TEXT,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  address TEXT,
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fleet_management (
  fleet_id SERIAL PRIMARY KEY,
  vehicle_id INTEGER REFERENCES vehicle_specifications(vehicle_id),
  acquisition_date DATE,
  depreciation_rate NUMERIC,
  current_value NUMERIC,
  maintenance_cost NUMERIC,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
