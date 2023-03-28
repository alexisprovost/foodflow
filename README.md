# FoodFlow

[![CI/CD Pipeline](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml)

#### Experience convenience at its finest with FoodFlow - Food at your fingertips

## Description
A virtual vending machine made for teams

## API Documentation
[https://documenter.getpostman.com/view/26616031/2s93RRvYjD](https://documenter.getpostman.com/view/26616031/2s93RRvYjD)

## Dev Usage
```
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

## First time setup
To create the tables in the database you need access with a GET request this url to create the database structure.
```bash
curl https://127.0.0.1/api/1/setup
```

## Authors
FoodFlow was created by [Thomas](https://github.com/Thomkiller) and [Alexis](https://github.com/alexisprovost). 