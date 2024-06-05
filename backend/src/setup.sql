DROP DATABASE IF EXISTS project2;

CREATE DATABASE project2;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS vacations CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS itinerary CASCADE;
DROP TABLE IF EXISTS time CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE vacations (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE time (
    id SERIAL PRIMARY KEY,
    time VARCHAR(255) NOT NULL
);

CREATE TABLE itinerary (
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





INSERT INTO category (type) VALUES ('Hotel'), ('Restaurant'), ('Activity'), ('Transportation');

INSERT INTO time (time) VALUES ('Morning'), ('Afternoon'), ('Evening'), ('Late Night');
