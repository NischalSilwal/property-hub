-- Initial seed data (only runs on first container creation)

USE property_hub_db;

-- Sample properties
INSERT INTO properties (title, location, price, bedrooms, bathrooms, sqft, description) VALUES
('Luxury Villa in Lazimpat', 'Lazimpat, Kathmandu', 180000000.00, 5, 4, 4500, 'Stunning modern villa with panoramic views of the Himalayas'),
('Modern Apartment in Baneshwor', 'Baneshwor, Kathmandu', 35000000.00, 2, 2, 1200, 'Luxurious apartment in the heart of the city with easy transit access'),
('Lakeside Villa in Pokhara', 'Lakeside, Pokhara', 120000000.00, 4, 3, 3200, 'Beautiful lakefront property with private access to Phewa Lake'),
('Trendy Loft in Thamel', 'Thamel, Kathmandu', 15000000.00, 1, 1, 900, 'Modern loft-style apartment situated in the vibrant tourist hub'),
('Mountain Cottage in Nagarkot', 'Nagarkot, Bhaktapur', 45000000.00, 3, 2, 2000, 'Cozy cottage with stunning sunrise views over the Everest range'),
('Penthouse in Sanepa', 'Sanepa, Lalitpur', 65000000.00, 3, 3, 2800, 'Stunning penthouse with views of the surrounding valley and hills'),
('Suburban Home in Kirtipur', 'Kirtipur, Kathmandu', 28000000.00, 4, 2, 2400, 'Beautiful family home in a peaceful, traditional neighborhood'),
('Traditional Newari House in Patan', 'Patan, Lalitpur', 55000000.00, 3, 2, 1800, 'Beautifully restored traditional brick and wood home with modern amenities');
