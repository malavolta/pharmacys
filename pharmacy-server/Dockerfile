FROM node:10-alpine

ENV PORT 8080

# Create an app directory to hold the application code
WORKDIR /usr/docker_nodejs_app/src/app

# Duplicate the dependenc'y file to the container's project root directory.
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside the docker image
COPY . .

CMD ["node", "server.js"]