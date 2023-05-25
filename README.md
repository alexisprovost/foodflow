# FoodFlow

[![CI/CD Pipeline](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/alexisprovost/foodflow/actions/workflows/ci-cd.yml)

![FoodFlow App](https://img.sshort.net/i/h5uF.jpeg)

## Experience convenience at its finest with FoodFlow

FoodFlow is a web app designed to streamline the buying and selling of snacks and products among team members within an organization. Users can list items for sale, which their colleagues can then purchase. Sellers receive the proceeds to restock and offer more items on the platform. Upon completing a transaction, buyers are provided with a confirmation via an invoice, email, or QR code. Detailed information on item collection, such as office locations, is also included to ensure a seamless and efficient process.

## API Documentation

[https://documenter.getpostman.com/view/26616031/2s93RRvYjD](https://documenter.getpostman.com/view/26616031/2s93RRvYjD)

## Usage and Installation

1. To run this project you need to have [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/install/) installed. docker-compose is included in Docker Desktop. You can test if you have the requirements using these commands.

```bash
docker --version
```
v2
```bash
docker compose --version
```
v1
```bash
docker-compose --version
```

2. To ensure proper execution of this project, it is necessary to create an .env file using the provided template. In the dev directory you'll see a file called .env.template. Rename the file to .env and set the correct values in it.

```env
POSTGRES_USER="CHANGE_THIS_DB_USER"
POSTGRES_PASSWORD="CHANGE_THIS_DB_USER_PASS"
POSTGRES_DB="CHANGE_THIS_DB_NAME"
JWT_SECRET="CHANGE_THIS_JWT_SECRET"
REFRESH_TOKEN_SECRET="CHANGE_THIS_JWT_REFRESH_SECRET"
MAILGUN_API_KEY="CHANGE_THIS_APIKEY"
MAILGUN_DOMAIN="CHANGE_THIS_MAILGUN_DOMAIN"
ACCESS_TOKEN_EXPIRES="3600"
REFRESH_TOKEN_EXPIRES="604800"
```

tip. you can use this command to generate jwt secrets [Source](https://mojitocoder.medium.com/generate-a-random-jwt-secret-22a89e8be00d)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

3. To launch the project with Docker, use the docker-compose.yml file for the production version. For the development version, use the docker-compose.dev.yml file.

**!! Run these commands in the ./dev folder !!**

The differences between the development version and the production version are as follows:

### **Development:**
- The code is not compacted, so it may be slower to load the page initially.
- Employs file save detection to auto-reload any changes instantly, enhancing the developer experience.
- Utilizes Vite server for the /api reverse proxy.

To start use
```bash
docker-compose -f docker-compose.dev.yml up
```

To stop use
```bash
docker-compose -f docker-compose.dev.yml down --remove-orphans
```

### **Production:**
- Runs with a production build of React, so it's compacted more efficiently to run smoothly in any browser.
- Doesn't support file detection for hot reload.
- Utilizes Nginx for the /api reverse proxy.

The production build utilizes an image repository for storing images that are built via GitHub Actions. When a pull request is successfully merged into the production branch, the system initiates a compilation process and updates the resulting build to the DigitalOcean droplet. So its harder to run the prod build on your local machine but not possible.

If you really want to you can use:

```bash
docker login ghcr.io --username github-account
```

You can access `/api/v1/setup/add-samples` using a GET request to insert sample products into the database.

The database will create the tables if they aren't already present during the initial page load. However, this process might cause the first page load to crash.

#### Add new packages

When the node js packages changes. You need to run this command to rebuild the docker image with the updated packages in it.

```bash
docker-compose -f docker-compose.dev.yml build
```

#### To be admin
Since no users are superadmin by default if you want to add a super admin user you can execute this command to enter the database container. [source](https://stackoverflow.com/a/63962237)
```bash
docker exec -it <container-name> bash
```
```bash
psql -U <dataBaseUserName> <dataBaseName>
```
or just this one-liner :
```bash
docker exec -it  <container-name> psql -U <dataBaseUserName> <dataBaseName>
```

## References

This project may contain elements derived from various resources including [YouTube video tutorials](https://youtube.com/), [Google searches](https://google.com/), inquiries addressed to [ChatGPT](https://chat.openai.com), insights gained from [Copilot](https://github.com/features/copilot), and the extensive information provided by numerous library documentation websites (checkout the dev/vite-app/package.json for the complete list).

## Authors

FoodFlow was created by [Thomas](https://github.com/Thomkiller) and [Alexis](https://github.com/alexisprovost).

## License

This project is licensed under the Apache License, Version 2.0. See the LICENSE file for details.
