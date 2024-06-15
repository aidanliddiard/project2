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


