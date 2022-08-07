-- ! Create users table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users
(
    id        uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email     VARCHAR(64)  NOT NULL UNIQUE,
    username  VARCHAR(64)  NOT NULL UNIQUE,
    firstname VARCHAR(64)  NOT NULL,
    lastname  VARCHAR(64)  NOT NULL,
    password  VARCHAR(255) NOT NULL
);
