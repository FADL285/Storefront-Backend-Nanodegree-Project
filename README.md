# Storefront Backend Project

## Project Overview

https://user-images.githubusercontent.com/53804570/183279249-b74d7a41-36e1-4f5d-9bfe-7eb64b9db3d1.mp4

### Project Summary

The company stakeholders have decided they want to set up an online store to make their great product ideas available
for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of [requirements](REQUIREMENTS.md) for this online store.

My job is to design the database, its tables and columns to fulfill the data requirements and craft a RESTful API that
exposes that information to the frontend developer.

The application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide
user authentication tokens that are ready to integrate with the frontend.

## Table of Contents

1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Environment Setup](#environment-setup)
    3. [Project Setup](#project-setup)
    4. [Running the App](#running-the-app)
2. [Project Scripts](#project-scripts)
3. [Endpoints](#endpoints)
4. [Database Schema](#database-schema)

## Getting Started

These instructions will help you to run the project on your local machine for development and testing
purposes.

### Prerequisites

1. [node](https://nodejs.org/en/)  👉👉  ``To Run The Application.``
2. [docker](https://www.docker.com/products/docker-desktop/)
   👉👉  ``Install Docker to Run Postgres Database with docker-compose.``

> Note: You can ignore docker installation and install postgresql on your machine.

### Environment Setup

**Copy ``.env.exmample to .env`` and update the environment variables with your values**

```bash
cp .env.example .env
```

**``.env`` Structure**

```bash
# App Configuration
PORT=3000
NODE_ENV=development
# DB Configuration
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB="DATABASE_NAME for Dev"
POSTGRES_DB_TEST="DATABASE_NAME for Test"
POSTGRES_USER="DATABASE USERNAME"
POSTGRES_PASSWORD="DATABASE PASSWORD"
# Bcrypt Configuration
BCRYPT_PASSWORD="YOUR SECRET PASSWORD"
SALT_ROUNDS=10
# JWT Configuration
JWT_SECRET="YOUR SECRET PASSWORD FOR TOKEN"
```

### Project Setup

**Install Dependencies**

```bash
npm install
```

**Start Postgres Server (on Docker)**

```bash
docker-compose up
```

**Create the Database, if not already created**

```postgresql
CREATE DATABASE storefront; -- For Development purposes
CREATE DATABASE storefront_test; -- For Testing purposes
```

**Run database Migrations**

```bash
npm run migrate:up
```

### Running the App

**Run the Application on development mode** 👉👉 App will run on [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
```

**Build the Application for production and start it**

```bash
npm run start
```

## Project Scripts

### Project setup

```bash
npm install
```

### Start the server for development

```bash
npm run dev
```

### Compiles and minifies for production

```bash
npm run build
```

### Start the server after build `production`

```bash
npm run start
```

### Run the unit tests

```bash
npm run test
```

### Run the database migrations

```bash
npm run migrate:up    # Create the database schema
npm run migrate:down  # Drop the database tables
```

### Lints and run prettier to auto format

```bash
npm run format
```

```bash
npm run lint
```

### Lints and fixes files

```bash
npm run lint:fix
```

## Endpoints

See [REQUIREMENTS.md](REQUIREMENTS.md) file

## Database Schema

See [REQUIREMENTS.md](REQUIREMENTS.md) file
