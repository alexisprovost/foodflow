# Use Node.js LTS version as base image
FROM node:latest

# Create a working directory for the app
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app files to the working directory
COPY . .

# Build TypeScript files
RUN yarn run build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
