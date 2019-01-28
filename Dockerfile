# # Use an official Ubuntu Xenial as a parent image
# FROM ubuntu:16.04

# # Install Node.js 8 and npm 5
# RUN apt-get update
# RUN apt-get -qq update
# RUN apt-get install -y build-essential
# #RUN apt-get install python-minimal
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
# RUN apt-get install -y nodejs
# RUN npm install pm2 -g
# RUN mkdir /home/app

# # Set the working directory to /app
# WORKDIR /home/app

# # Copy the current directory contents into the container
# ADD . /home/app
# RUN cd /home/app

# # Install any needed packages specified in package.json
# RUN npm install
# RUN npm run build

# # Make port 9001 available outside this container
# EXPOSE 9001

# # Run `npm start` when the container launches
# #CMD ["npm", "start"]
# CMD ["pm2-runtime", "build/server.js"]


FROM node:8-stretch
LABEL maintainer="Rajaranjan <rajaranjans@gmail.com>"

RUN mkdir /home/app

# Set the working directory to /app
WORKDIR /home/app

# Copy the current directory contents into the container
ADD . /home/app
RUN cd /home/app

# Install any needed packages specified in package.json
RUN npm install pm2 -g
RUN npm install
RUN npm run build

# Expose ports needed to use Keymetrics.io
EXPOSE 9001

# Start pm2.json process file
CMD ["pm2-runtime", "build/server.js"]