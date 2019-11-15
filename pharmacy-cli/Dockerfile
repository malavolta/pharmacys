FROM node:10-alpine

# Create an app directory to hold the application code
WORKDIR /usr/src/app

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside the docker image
COPY . .

RUN npm run postinstall

COPY . .

CMD ["node", "server.js"]