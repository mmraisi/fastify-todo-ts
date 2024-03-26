# Use Node.js v18 as the base image
FROM node:21-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/src/index.js"]
