FROM ubuntu:22.04

# NodeJS & Chromium for tests
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt install -y nodejs

# Create app directory
WORKDIR /usr/src/app

# Install Jemalloc
RUN apt-get update && apt-get install libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production --frozen-lockfile

# Bundle app source
COPY . .

# Start command
CMD [ "yarn", "prod" ]