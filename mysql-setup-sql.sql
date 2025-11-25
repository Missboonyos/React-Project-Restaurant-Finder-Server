-- Create Database
CREATE DATABASE restaurant_finder;
USE restaurant_finder;

-- Restaurants Table
CREATE TABLE restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    address TEXT,
    phone VARCHAR(20),
    rating DECIMAL(3, 2) DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items Table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    user_name VARCHAR(100),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Favorites Table
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT,
    user_id INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (restaurant_id, user_id)
);

-- Insert Sample Data (same as mock data)
INSERT INTO restaurants (name, category, latitude, longitude, address, phone, rating, image_url) VALUES
('Pasta Palace', 'Italian', 13.7563, 100.5018, '123 Sukhumvit Rd, Bangkok', '02-123-4567', 4.5, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'),
('Sushi Express', 'Japanese', 13.7465, 100.5351, '456 Silom Rd, Bangkok', '02-234-5678', 4.8, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'),
('Thai Spice', 'Thai', 13.7278, 100.5241, '789 Sathorn Rd, Bangkok', '02-345-6789', 4.3, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400'),
('Dragon Palace', 'Chinese', 13.7400, 100.5200, '321 Yaowarat Rd, Bangkok', '02-456-7890', 4.2, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400'),
('Green Garden', 'Vegan', 13.7350, 100.5300, '555 Thonglor Rd, Bangkok', '02-567-8901', 4.6, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'),
('Steak House', 'Western', 13.7450, 100.5400, '999 Rama 4 Rd, Bangkok', '02-678-9012', 4.4, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400');

-- Insert Menu Items
INSERT INTO menu_items (restaurant_id, name, price) VALUES
(1, 'Carbonara', 250.00),
(1, 'Margherita Pizza', 320.00),
(1, 'Lasagna', 280.00),
(2, 'Salmon Sushi Set', 350.00),
(2, 'Ramen', 180.00),
(2, 'Tempura', 220.00),
(3, 'Pad Thai', 120.00),
(3, 'Green Curry', 150.00),
(3, 'Tom Yum Soup', 180.00),
(4, 'Dim Sum', 200.00),
(4, 'Peking Duck', 450.00),
(4, 'Fried Rice', 120.00),
(5, 'Buddha Bowl', 180.00),
(5, 'Vegan Burger', 220.00),
(5, 'Smoothie Bowl', 150.00),
(6, 'Ribeye Steak', 650.00),
(6, 'BBQ Ribs', 450.00),
(6, 'Caesar Salad', 180.00);

-- Insert Sample Reviews
INSERT INTO reviews (restaurant_id, user_name, rating, comment) VALUES
(1, 'John', 5, 'Amazing pasta!'),
(1, 'Sarah', 4, 'Great atmosphere'),
(2, 'Mike', 5, 'Best sushi in town!'),
(3, 'Lisa', 4, 'Authentic Thai food'),
(5, 'Emma', 5, 'Love the healthy options!'),
(6, 'Tom', 4, 'Great steaks!');

-- Adding Menu Features
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    -- Foreign key links this item back to the restaurant
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,       -- Email must be unique for login
    password_hash VARCHAR(255) NOT NULL,      -- Stores the SECURELY HASHED password
    user_name VARCHAR(100) NOT NULL,          -- User's display name
    role VARCHAR(50) DEFAULT 'user'           -- Optional role field
);