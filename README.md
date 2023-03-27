# FoodFlow

[![CI/CD Pipeline](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml)

#### Experience convenience at its finest with FoodFlow - Food at your fingertips

## Description
A virtual vending machine made for teams

## Dev Usage
```
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

## Extra - PGADMIN container
```bash
docker run -d --name pgadmin_container -p 5050:80 -e PGADMIN_DEFAULT_EMAIL="pgadmin4@pgadmin.org" -e PGADMIN_DEFAULT_PASSWORD="AAAaaa123" -e PGADMIN_CONFIG_SERVER_MODE=False --restart unless-stopped dpage/pgadmin4
```

## Authors
FoodFlow was created by Thomas and Alexis. 