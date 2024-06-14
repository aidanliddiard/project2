-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS vacations CASCADE;
-- DROP TABLE IF EXISTS itinerary CASCADE;
-- DROP TABLE IF EXISTS category CASCADE;
-- DROP TABLE IF EXISTS time CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS vacations (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    image_url VARCHAR(255),
    alt VARCHAR(255),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS time (
    id SERIAL PRIMARY KEY,
    time VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS itinerary (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES category(id),
    price DECIMAL(10, 2),
    address VARCHAR(255),
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    time_id INTEGER REFERENCES time(id),
    website VARCHAR(255),
    vacation_id INTEGER REFERENCES vacations(id) ON DELETE CASCADE
);


INSERT INTO category (type)
SELECT * FROM (VALUES ('Hotel'), ('Restaurant'), ('Activity')) AS tmp (type)
WHERE NOT EXISTS (SELECT 1 FROM category);

INSERT INTO time (time)
SELECT * FROM (VALUES ('Morning'), ('Afternoon'), ('Evening'), ('Late Night')) AS tmp (time)
WHERE NOT EXISTS (SELECT 1 FROM time);


INSERT INTO itinerary (name, category_id, price, address, description, start_date, end_date, time_id, website, vacation_id)
VALUES 
('Sydney Harbour Marriott Hotel', 1, 200.00, '30 Pitt St, Sydney NSW 2000, Australia', 'Luxury hotel with a view of Sydney Harbour', '2023-01-01', '2023-01-10', 1, 'https://www.marriott.com/hotels/travel/sydmc-sydney-harbour-marriott-hotel-at-circular-quay/', 392),
('The Westin Sydney', 1, 180.00, '1 Martin Pl, Sydney NSW 2000, Australia', 'Upscale hotel in the heart of the city', '2023-01-01', '2023-01-10', 1, 'https://www.marriott.com/hotels/travel/sydwi-the-westin-sydney/', 392),
('Four Seasons Hotel Sydney', 1, 250.00, '199 George St, Sydney NSW 2000, Australia', 'Luxury hotel with a view of Sydney Harbour', '2023-01-01', '2023-01-10', 1, 'https://www.fourseasons.com/sydney/', 392),
('Shangri-La Hotel, Sydney', 1, 220.00, '176 Cumberland St, The Rocks NSW 2000, Australia', 'Luxury hotel with a view of Sydney Harbour', '2023-01-01', '2023-01-10', 1, 'https://www.shangri-la.com/sydney/shangrila/', 392),
('Quay Restaurant', 2, 50.00, 'Upper Level, Overseas Passenger Terminal, The Rocks NSW 2000, Australia', 'Fine dining with a view of Sydney Harbour', '2023-01-02', NULL, 2, 'https://www.quay.com.au/', 392),
('Bennelong Restaurant', 2, 55.00, 'Sydney Opera House, Bennelong Point, Sydney NSW 2000, Australia', 'Fine dining in the Sydney Opera House', '2023-01-03', NULL, 2, 'https://www.bennelong.com.au/', 392),
('Tetsuya’s Restaurant', 2, 60.00, '529 Kent St, Sydney NSW 2000, Australia', 'World-renowned Japanese-Australian cuisine', '2023-01-04', NULL, 2, 'https://tetsuyas.com/', 392),
('Sydney Opera House Tour', 3, 37.00, 'Bennelong Point, Sydney NSW 2000, Australia', 'A tour of the iconic Sydney Opera House', '2023-01-05', NULL, 3, 'https://www.sydneyoperahouse.com/', 392),
('Sydney Harbour Bridge Climb', 3, 308.00, '3 Cumberland St, The Rocks NSW 2000, Australia', 'Climb to the top of the Sydney Harbour Bridge', '2023-01-06', NULL, 3, 'https://www.bridgeclimb.com/', 392),
('Taronga Zoo Sydney', 3, 46.00, 'Bradleys Head Rd, Mosman NSW 2088, Australia', 'Visit animals from around the world at this harbourside zoo', '2023-01-07', NULL, 3, 'https://taronga.org.au/sydney-zoo', 392);