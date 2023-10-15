# Use Node.js LTS version as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Make port 3000 available to the outside world
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
