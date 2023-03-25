FROM node:latest AS build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:stable-alpine

# Create certificates directory
RUN mkdir -p /etc/nginx/certs

# Generate self-signed certificate for HTTPS
RUN apk add openssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/server.key -out /etc/nginx/certs/server.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Copy nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
