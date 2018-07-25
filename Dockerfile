FROM node:carbon-alpine

# Create work directory
WORKDIR /app

# Copy app source to work directory
COPY . /app

# Install app dependencies & build the app
RUN npm install && npm run build

# Run the app
CMD npm run serve
