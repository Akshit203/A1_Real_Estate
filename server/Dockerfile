FROM node:18

# set working directory
WORKDIR /app

# copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# copy rest of the code
COPY . .

# expose backend port (example: 5000)
EXPOSE 5000

# start server
CMD ["npm", "start"]
