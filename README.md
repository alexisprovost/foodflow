# FoodFlow

[![CI/CD Pipeline](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml)

## Experience convenience at its finest with FoodFlow

Food at your fingertips. A virtual vending machine made for teams

## API Documentation

[https://documenter.getpostman.com/view/26616031/2s93RRvYjD](https://documenter.getpostman.com/view/26616031/2s93RRvYjD)

## How to run it

1. To ensure proper execution of this project, it is necessary to create an .env file using the provided template. In the dev directory you'll see a file called .env.template. Rename the file to .env and set the correct values in it.

```env
POSTGRES_USER="CHANGE_THIS_DB_USER"
POSTGRES_PASSWORD="CHANGE_THIS_DB_USER_PASS"
POSTGRES_DB="CHANGE_THIS_DB_NAME"
JWT_SECRET="CHANGE_THIS_JWT_SECRET"
REFRESH_TOKEN_SECRET="CHANGE_THIS_JWT_REFRESH_SECRET"
```

tip. you can use this command to generate jwt secrets [https://mojitocoder.medium.com/generate-a-random-jwt-secret-22a89e8be00d](Source)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. To launch the project with Docker, use the docker-compose.yml file for the production version. For the development version, use the docker-compose.dev.yml file. Run these commands in the ./dev folder

production

```bash
docker-compose up
```

development

```bash
docker-compose -f docker-compose.dev.yml up
```

#### Tips

When the node js packages changes. You need to run this command to rebuild the docker image with the updated packages in it.

```bash
docker-compose -f docker-compose.dev.yml build
```

## Authors

FoodFlow was created by [Thomas](https://github.com/Thomkiller) and [Alexis](https://github.com/alexisprovost).
