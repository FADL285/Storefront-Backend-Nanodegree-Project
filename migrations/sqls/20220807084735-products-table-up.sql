-- ! Create products table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products
(
    id    uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name  VARCHAR(64)   NOT NULL,
    price NUMERIC(8, 2) NOT NULL
);
