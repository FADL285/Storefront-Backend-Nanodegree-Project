-- ! Create orders table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products
(
    id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity   INTEGER NOT NULL,
    order_id   uuid REFERENCES orders (id),
    product_id uuid REFERENCES products (id)
);
