-- Users 

CREATE TABLE users(
 id UUID DEFAULT uuid_generate_v4(),
 first_name VARCHAR(255) NOT NULL,
 last_name VARCHAR(255) NOT NULL,
 region VARCHAR(255) NOT NULL,
 role VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 sign_up_date date NOT NULL DEFAULT CURRENT_DATE,
 CONSTRAINT users_email_key UNIQUE (email),
 PRIMARY KEY (id)
);

-- Plans

CREATE TABLE plans(
 id SERIAL PRIMARY KEY,
 user_id UUID NOT NULL REFERENCES users(id),
 description VARCHAR(255) NOT NULL,
 create_date date NOT NULL DEFAULT CURRENT_DATE
);

-- Feedbacks

CREATE TABLE feedbacks(
 id SERIAL PRIMARY KEY,
 user_id UUID NOT NULL REFERENCES users(id),
 plan_id INT NOT NULL REFERENCES plans(id),
 description VARCHAR(255) NOT NULL,
 create_date date NOT NULL DEFAULT CURRENT_DATE
);

-- Goals

CREATE TABLE goals(
 id SERIAL PRIMARY KEY,
 plan_id INT NOT NULL REFERENCES plans(id),
 title VARCHAR(255) NOT NULL,
 status VARCHAR(255) NOT NULL,
 start_date date NOT NULL,
 end_date date NOT NULL,
 create_date date NOT NULL DEFAULT CURRENT_DATE
);

-- Tasks

CREATE TABLE Tasks(
 id SERIAL PRIMARY KEY,
 goal_id INT NOT NULL REFERENCES goals(id),
 description VARCHAR(255) NOT NULL,
 status VARCHAR(255) NOT NULL,
 create_date date NOT NULL DEFAULT CURRENT_DATE
);
