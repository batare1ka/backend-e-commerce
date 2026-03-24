FROM node:20-alpine

WORKDIR /app

# Copy only package files first → better caching
COPY package*.json ./

# Install ALL dependencies (dev + prod)
RUN npm install

# Copy the rest of your code (optional during dev, but good practice)
COPY . .

# This will be overridden by docker-compose if needed
CMD ["npm", "run", "dev"]