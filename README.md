# FoodFlow

[![CI/CD Pipeline](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml)

## Experience convenience at its finest with FoodFlow 
Food at your fingertips. A virtual vending machine made for teams


## API Documentation

[https://documenter.getpostman.com/view/26616031/2s93RRvYjD](https://documenter.getpostman.com/view/26616031/2s93RRvYjD)

## First time setup

1. To ensure proper execution of this project, it is necessary to create an .env file using the provided template. The .env file should be placed in the /dev folder, and all the commands listed below should be executed in the same folder.

```env
POSTGRES_USER="CHANGE_THIS_DB_USER"
POSTGRES_PASSWORD="CHANGE_THIS_DB_USER_PASS"
POSTGRES_DB="CHANGE_THIS_DB_NAME"
JWT_SECRET="CHANGE_THIS_JWT_SECRET"
```
2. To launch the project with Docker, use the docker-compose.yml file for the production version. For the development version, use the docker-compose.dev.yml file.
```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

3. To create the database tables, you need to send a GET request to the following URL to initiate the database structure.

```bash
curl https://127.0.0.1/api/1/setup
```

## How to run it after the first run
After the first run, you may need to use the build command to ensure that any added Node.js packages are installed in the Docker image.
```
docker-compose -f docker-compose.dev.yml up
```

## Authors

FoodFlow was created by [Thomas](https://github.com/Thomkiller) and [Alexis](https://github.com/alexisprovost).
