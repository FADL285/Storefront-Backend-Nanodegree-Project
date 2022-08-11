# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Table of Contents
1. [API Endpoints](#api-endpoints)
2. [Data Schema](#data-schema)
3. [Data Shapes](#data-shapes)

## API Endpoints
Get Postman Documentation from [this link](https://documenter.getpostman.com/view/10429678/VUjQnQiy)

> AUTHORIZATION TYPE: ***Bearer Token***

#### Products
- Index
  - GET `/api/products`
- Show
  - GET `/api/products/:id`
- Create <sub>[token required]</sub>
  - POST `/api/products`
  - Body 
    ```json
    {
      "name": "Product_1",
      "price": 99,
      "category": "TestCat"
    }
    ```
- [OPTIONAL] Products by category (args: product category)
  - GET `/api/products/categories/:category`
- [OPTIONAL] Top 5 most popular products `Not Implemented yet`
- [ADDED] Update <sub>[token required]</sub>
  - PATCH `/api/products/:id`
  - Body ➡️ (name, price, category) is optional
    ```json
    {
      "name": "Stereo Headset", 
      "category": "Accessories"
    }
    ```
- [ADDED] Delete <sub>[token required]</sub>
  - DELETE `/api/products/:id`

#### Users
- Index <sub>[token required]</sub>
  - GET `/api/users`
- Show <sub>[token required]</sub>
  - GET `/api/users/:id`
- Create
  - POST `/api/users`
  - Body 
    ```json
    {
      "email": "MohamedFadl@mail.com",
      "username": "FADL285",
      "firstname": "Mohamed",
      "lastname": "FADL",
      "password": "my_password"
    }
    ```
- [ADDED] Authenticate
  - POST `/api/users/authenticate`
  - Body 
    ```json
    {
      "email": "MohamedFadl@mail.com",
      "password": "my_password"
    }
    ```
- [ADDED] Update <sub>[token required]</sub>
  - PATCH `/api/users/:id`
  - Body ➡️ Any User Props can be on body
    ```json
    {
      "email": "MohamedFadl@mail.com",
      "lastname": "Aboul-Fadl"
    }
    ```
- [ADDED] Delete <sub>[token required]</sub>
  - DELETE `/api/users/:id`

#### Orders -- [ TOKEN Required ]
- Current Order by user (args: user id)
  - GET `/api/users/:id/orders`
- [ADDED] Get All Orders
  - GET `/api/orders`
- [ADDED] Get Order by Status 
  - GET `api/orders/statuses/:status` ➡️ Status: [active, completed, canceled]
- [ADDED] Get User Orders by Status
  - GET `api/users/:id/orders/statuses/:status`
- [OPTIONAL] Completed Orders by user (args: user id)
  - GET `api/users/:id/orders/statuses/completed`
- [ADDED] Get Order
  - GET `api/orders/:id
- [ADDED] Create Order
  - POST `api/orders/`
  - Body
    ```json
    {
      "userId": "a97d839c-4fe0-4837-afdc-d5ea72e17eec"
    }
    ```
- [ADDED] Update Order Status
  - PATCH `api/orders/:id`
  - Body
    ```json
    {
      "status": "completed"
    }
    ```
#### Order Products 💡 { ADDED } -- [ TOKEN Required ]
- Get Order Products
  - GET `api/orders/:id/products`
- GET Order Product
  - GET `api/orders/:id/products/:productId`
- Add Product to existing order
  - POST `api/orders/:id/products`
  - Body
    ```json
    {
      "productId": "83307ecd-d467-4ec9-ac56-0cf9b0d2bba4",
      "quantity": 2
    }
    ```
- Update Order Product Quantity
  - PATCH `api/orders/:id/products/:productId`
  - Body 
    ```json
    {
      "quantity": 4
    }
    ```
- Delete Order Product
  - DELETE `api/orders/:id/products/:productId`

## Data Schema

#### Products Schema
```postgresql
-- ! Create products table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products
(
    id    uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name  VARCHAR(64)   NOT NULL,
    price NUMERIC(8, 2) NOT NULL,
    category VARCHAR(64) NOT NULL
);

```

#### Users Schema
```postgresql
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

```

#### Orders Schema
```postgresql
-- ! Create orders table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders
(
    id      uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status  VARCHAR(64) NOT NULL,
    user_id uuid REFERENCES users (id)
);

```

#### Order Products Schema
```postgresql
-- ! Create orders table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products
(
    id         uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity   INTEGER NOT NULL,
    order_id   uuid REFERENCES orders (id),
    product_id uuid REFERENCES products (id)
);

```

## Data Shapes
#### Product
```typescript
interface IProduct {
  id?: string
  name: string
  price: number
  category: string
  quantity?: number
}
```

#### User
```typescript
interface IUser {
  id?: string
  email: string
  username: string
  firstname: string
  lastname: string
  password: string
}

```

#### Orders
```typescript
enum OrderStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

interface IOrder {
  id?: string
  status: OrderStatus
  userId: string
  products?: IProduct[]
  product?: IProduct
}
```

#### Order Product
```typescript
interface IOrderProduct {
  id?: string
  quantity: number
  orderId: string
  productId: string
  userId?: string
  product?: IProduct
}
```
