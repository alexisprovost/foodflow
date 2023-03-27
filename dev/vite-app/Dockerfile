FROM node:latest AS build

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:stable-alpine

# Install openssl for certificate generation
RUN apk add openssl

# Generate self-signed SSL certificate
RUN openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 \
    -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost" \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 443
EXPOSE 5173

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
