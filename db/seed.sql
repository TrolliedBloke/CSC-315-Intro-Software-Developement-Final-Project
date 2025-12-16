-- Seed data for products
-- This file populates the database with initial product data

-- Insert products
INSERT INTO products (product_id, title, brand, style_code, year, condition, colorway, hero_image) VALUES
('aj4-cool-grey', 'Air Jordan 4 Retro "Cool Grey"', 'Jordan', '308497-007', 2019, 'Brand New (Deadstock)', 'Cool Grey / White', '/assets/placeholder-shoe.png'),
('nike-dunk-low', 'Nike Dunk Low', 'Nike', 'DD1391-100', 2021, 'Brand New', 'White / Black', '/assets/placeholder-shoe-nike.png'),
('nb-550', 'New Balance 550', 'New Balance', 'BB550WT1', 2022, 'Brand New', 'White / Green', '/assets/placeholder-shoe-nb.png'),
('nb-990v5', 'New Balance 990v5', 'New Balance', 'M990GL5', 2019, 'Brand New', 'Grey / White', '/assets/placeholder-shoe-nb.png'),
('nb-2002r', 'New Balance 2002R', 'New Balance', 'M2002R', 2020, 'Brand New', 'Rain Cloud / Grey', '/assets/placeholder-shoe-nb.png'),
('nb-574', 'New Balance 574', 'New Balance', 'ML574EVG', 2018, 'Brand New', 'Grey / White', '/assets/placeholder-shoe-nb.png'),
('aj4-bred', 'Air Jordan 4 "Bred"', 'Jordan', '308497-060', 2019, 'Brand New', 'Black / Cement Grey / Fire Red', '/assets/placeholder-shoe-bred.png'),
('nike-air-max-270', 'Nike Air Max 270', 'Nike', 'AH8050-100', 2018, 'Brand New', 'White / Black', '/assets/placeholder-shoe-nike.png'),
('nike-zoom-fly-5', 'Nike Zoom Fly 5', 'Nike', 'DM8968-001', 2022, 'Brand New', 'Black / White', '/assets/placeholder-shoe-nike.png'),
('nike-air-force-1', 'Nike Air Force 1', 'Nike', 'CW2288-111', 2020, 'Brand New', 'White / White', '/assets/placeholder-shoe-nike.png'),
('adidas-ultraboost', 'Adidas Ultraboost', 'Adidas', 'BB6149', 2018, 'Brand New', 'Core Black / White', '/assets/placeholder-shoe.png'),
('adidas-samba-og', 'Adidas Samba OG', 'Adidas', 'B75807', 2020, 'Brand New', 'White / Black / Gum', '/assets/placeholder-shoe.png'),
('adidas-forum-low', 'Adidas Forum Low', 'Adidas', 'FY7756', 2021, 'Brand New', 'White / Blue', '/assets/placeholder-shoe.png'),
('adidas-nmd-r1', 'Adidas NMD R1', 'Adidas', 'BA7245', 2017, 'Brand New', 'Core Black / White', '/assets/placeholder-shoe.png')
ON CONFLICT (product_id) DO NOTHING;

-- Insert product images (thumbnails)
-- For aj4-cool-grey
INSERT INTO product_images (product_id, image_url, display_order) 
SELECT id, '/assets/placeholder-shoe.png', 0 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_images (product_id, image_url, display_order) 
SELECT id, '/assets/placeholder-shoe-2.png', 1 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_images (product_id, image_url, display_order) 
SELECT id, '/assets/placeholder-shoe-3.png', 2 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;

-- Insert product sizes and prices
-- aj4-cool-grey
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 225 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8.5', 234 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 256 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9.5', 263 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 289 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10.5', 282 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 271 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11.5', 278 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '12', 286 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '12.5', 267 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '13', 259 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '14', 250 FROM products WHERE product_id = 'aj4-cool-grey'
ON CONFLICT DO NOTHING;

-- nike-dunk-low
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 170 FROM products WHERE product_id = 'nike-dunk-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 180 FROM products WHERE product_id = 'nike-dunk-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 185 FROM products WHERE product_id = 'nike-dunk-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 190 FROM products WHERE product_id = 'nike-dunk-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 195 FROM products WHERE product_id = 'nike-dunk-low'
ON CONFLICT DO NOTHING;

-- nb-550
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 150 FROM products WHERE product_id = 'nb-550'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 155 FROM products WHERE product_id = 'nb-550'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 160 FROM products WHERE product_id = 'nb-550'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 165 FROM products WHERE product_id = 'nb-550'
ON CONFLICT DO NOTHING;

-- nb-990v5
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 185 FROM products WHERE product_id = 'nb-990v5'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 190 FROM products WHERE product_id = 'nb-990v5'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 195 FROM products WHERE product_id = 'nb-990v5'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 200 FROM products WHERE product_id = 'nb-990v5'
ON CONFLICT DO NOTHING;

-- nb-2002r
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 140 FROM products WHERE product_id = 'nb-2002r'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 145 FROM products WHERE product_id = 'nb-2002r'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 150 FROM products WHERE product_id = 'nb-2002r'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 155 FROM products WHERE product_id = 'nb-2002r'
ON CONFLICT DO NOTHING;

-- nb-574
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '6', 90 FROM products WHERE product_id = 'nb-574'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 95 FROM products WHERE product_id = 'nb-574'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 100 FROM products WHERE product_id = 'nb-574'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 105 FROM products WHERE product_id = 'nb-574'
ON CONFLICT DO NOTHING;

-- aj4-bred
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 310 FROM products WHERE product_id = 'aj4-bred'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 320 FROM products WHERE product_id = 'aj4-bred'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 330 FROM products WHERE product_id = 'aj4-bred'
ON CONFLICT DO NOTHING;

-- nike-air-max-270
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 150 FROM products WHERE product_id = 'nike-air-max-270'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 160 FROM products WHERE product_id = 'nike-air-max-270'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 165 FROM products WHERE product_id = 'nike-air-max-270'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 170 FROM products WHERE product_id = 'nike-air-max-270'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 175 FROM products WHERE product_id = 'nike-air-max-270'
ON CONFLICT DO NOTHING;

-- nike-zoom-fly-5
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 190 FROM products WHERE product_id = 'nike-zoom-fly-5'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 200 FROM products WHERE product_id = 'nike-zoom-fly-5'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 210 FROM products WHERE product_id = 'nike-zoom-fly-5'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 215 FROM products WHERE product_id = 'nike-zoom-fly-5'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 220 FROM products WHERE product_id = 'nike-zoom-fly-5'
ON CONFLICT DO NOTHING;

-- nike-air-force-1
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '6', 110 FROM products WHERE product_id = 'nike-air-force-1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 115 FROM products WHERE product_id = 'nike-air-force-1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 120 FROM products WHERE product_id = 'nike-air-force-1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 125 FROM products WHERE product_id = 'nike-air-force-1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 130 FROM products WHERE product_id = 'nike-air-force-1'
ON CONFLICT DO NOTHING;

-- adidas-ultraboost
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 180 FROM products WHERE product_id = 'adidas-ultraboost'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 190 FROM products WHERE product_id = 'adidas-ultraboost'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 195 FROM products WHERE product_id = 'adidas-ultraboost'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 200 FROM products WHERE product_id = 'adidas-ultraboost'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 205 FROM products WHERE product_id = 'adidas-ultraboost'
ON CONFLICT DO NOTHING;

-- adidas-samba-og
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '6', 100 FROM products WHERE product_id = 'adidas-samba-og'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 105 FROM products WHERE product_id = 'adidas-samba-og'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 110 FROM products WHERE product_id = 'adidas-samba-og'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 115 FROM products WHERE product_id = 'adidas-samba-og'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 120 FROM products WHERE product_id = 'adidas-samba-og'
ON CONFLICT DO NOTHING;

-- adidas-forum-low
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 120 FROM products WHERE product_id = 'adidas-forum-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 125 FROM products WHERE product_id = 'adidas-forum-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 130 FROM products WHERE product_id = 'adidas-forum-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 135 FROM products WHERE product_id = 'adidas-forum-low'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 140 FROM products WHERE product_id = 'adidas-forum-low'
ON CONFLICT DO NOTHING;

-- adidas-nmd-r1
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '7', 140 FROM products WHERE product_id = 'adidas-nmd-r1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '8', 150 FROM products WHERE product_id = 'adidas-nmd-r1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '9', 155 FROM products WHERE product_id = 'adidas-nmd-r1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '10', 160 FROM products WHERE product_id = 'adidas-nmd-r1'
ON CONFLICT DO NOTHING;
INSERT INTO product_sizes (product_id, size, price) 
SELECT id, '11', 165 FROM products WHERE product_id = 'adidas-nmd-r1'
ON CONFLICT DO NOTHING;

-- Insert related products
INSERT INTO related_products (product_id, related_product_id)
SELECT p1.id, p2.id FROM products p1, products p2 
WHERE p1.product_id = 'aj4-cool-grey' AND p2.product_id = 'aj4-bred'
ON CONFLICT DO NOTHING;
INSERT INTO related_products (product_id, related_product_id)
SELECT p1.id, p2.id FROM products p1, products p2 
WHERE p1.product_id = 'aj4-cool-grey' AND p2.product_id = 'nb-550'
ON CONFLICT DO NOTHING;
INSERT INTO related_products (product_id, related_product_id)
SELECT p1.id, p2.id FROM products p1, products p2 
WHERE p1.product_id = 'aj4-cool-grey' AND p2.product_id = 'nike-dunk-low'
ON CONFLICT DO NOTHING;

