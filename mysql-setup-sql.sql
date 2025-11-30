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
    description TEXT,
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
('Steak House', 'Western', 13.7450, 100.5400, '999 Rama 4 Rd, Bangkok', '02-678-9012', 4.4, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'),
('Pizza Pronto', 'Italian', 13.7600, 100.5500, '88/1 Sukhumvit 21, Bangkok', '02-777-1111', 4.1, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'),
('Katsu King', 'Japanese', 13.7500, 100.5000, '11/5 Rama I Rd, Bangkok', '02-888-2222', 4.7, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400'),
('Noodle House', 'Thai', 13.7300, 100.5100, '22 Yaowarat Rd, Bangkok', '02-999-3333', 4.0, 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400'),
('Wok Master', 'Chinese', 13.7400, 100.5450, '100 Ratchaprasong Rd, Bangkok', '02-666-4444', 4.4, 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400'), 
('Burger Barn', 'Western', 13.7250, 100.5350, '55 Silom Rd, Bangkok', '02-555-5555', 4.3, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400');

-- Insert Menu Items
INSERT INTO menu_items (restaurant_id, name, description, price) VALUES
(1, 'Carbonara','Yummy Carbonara', 250.00),
(1, 'Margherita Pizza', 'Yummy Margherita Pizza', 320.00),
(1, 'Lasagna', 'Yummy Lasagna', 280.00),
(2, 'Salmon Sushi Set','Yummy Salmon Sushi Set', 350.00),
(2, 'Ramen', 'Yummy Ramen', 180.00),
(2, 'Tempura', 'Yummy Tempura', 220.00),
(3, 'Pad Thai','Yummy Pad Thai', 120.00),
(3, 'Green Curry', 'Yummy Green Curry', 150.00),
(3, 'Tom Yum Soup', 'Yummy Tom Yum Soup', 180.00),
(4, 'Dim Sum', 'Yummy Dim Sum', 200.00),
(4, 'Peking Duck', 'Yummy Peking Duck', 450.00),
(4, 'Fried Rice', 'Yummy Fried Rice', 120.00),
(5, 'Buddha Bowl', 'Yummy Buddha Bowl', 180.00),
(5, 'Vegan Burger', 'Yummy Vegan Burger', 220.00),
(5, 'Smoothie Bowl', 'Yummy Smoothie Bowl', 150.00),
(6, 'Ribeye Steak', 'Yummy Ribeye Steak', 650.00),
(6, 'BBQ Ribs', 'Yummy BBQ Ribs', 450.00),
(6, 'Caesar Salad', 'Yummy Caesar Salad', 180.00),
(7, 'Pepperoni Pizza', 'Delicious pepperoni pizza', 350.00),
(7, 'Gnocchi', 'Homemade potato gnocchi', 290.00),
(7, 'Tiramisu', 'Classic Italian dessert', 180.00),
(7, 'Focaccia', 'Freshly baked bread', 90.00),
(7, 'Aglio Olio', 'Spaghetti with garlic and oil', 220.00),
(8, 'Pork Katsu Set', 'Crispy breaded pork cutlet', 280.00),
(8, 'California Roll', 'Crab stick, avocado, cucumber', 150.00),
(8, 'Udon Noodles', 'Hot Udon soup', 190.00),
(8, 'Gyozas', 'Pan-fried dumplings', 120.00),
(8, 'Matcha Ice Cream', 'Green tea ice cream', 90.00),
(9, 'Boat Noodles', 'Rich and flavorful broth', 80.00),
(9, 'Chicken Satay', 'Grilled marinated chicken skewers', 100.00),
(9, 'Mango Sticky Rice', 'Sweet sticky rice with fresh mango', 120.00),
(9, 'Massaman Curry', 'Mild and sweet curry', 160.00),
(9, 'Spring Rolls', 'Vegetable spring rolls', 90.00),
(10, 'Kung Pao Chicken', 'Spicy stir-fry', 230.00),
(10, 'Hot and Sour Soup', 'Spicy and tangy soup', 110.00),
(10, 'Beef with Broccoli', 'Stir-fried beef and broccoli', 250.00),
(10, 'Chow Mein', 'Stir-fried noodles', 180.00),
(10, 'Egg Tart', 'Sweet Cantonese pastry', 70.00),
(11, 'Classic Cheeseburger', 'Beef patty with cheese', 380.00),
(11, 'Onion Rings', 'Crispy fried onion rings', 150.00),
(11, 'Milkshake', 'Thick vanilla milkshake', 140.00),
(11, 'Truffle Fries', 'Fries with truffle oil and parmesan', 200.00),
(11, 'Veggie Patty Burger', 'Plant-based patty', 350.00);

-- Insert Sample Reviews
INSERT INTO reviews (restaurant_id, user_name, rating, comment) VALUES
(1, 'John', 5, 'Amazing pasta!'),
(1, 'Sarah', 4, 'Great atmosphere'),
(2, 'Mike', 5, 'Best sushi in town!'),
(3, 'Lisa', 4, 'Authentic Thai food'),
(5, 'Emma', 5, 'Love the healthy options!'),
(6, 'Tom', 4, 'Great steaks!'),
(7, 'David', 4, 'Good pizza, fast service.'),
(8, 'Grace', 5, 'Katsu was perfect!'),
(9, 'Kevin', 3, 'A bit crowded but good noodles.'),
(10, 'Olivia', 5, 'Best Kung Pao in Bangkok.'),
(11, 'Ethan', 4, 'Excellent burger and fries.');

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

-- Create Users Table
USE restaurant_finder;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Update favorites table to use actual user IDs
ALTER TABLE favorites 
MODIFY COLUMN user_id INT NOT NULL;

-- Add foreign key
ALTER TABLE favorites
ADD CONSTRAINT fk_favorites_user
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;