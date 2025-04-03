# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application on port 4000
EXPOSE 4000

# Start the Next.js application
CMD ["npm", "run", "start"]
