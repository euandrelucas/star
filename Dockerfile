FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install Jemalloc
RUN apt-get update && apt-get install libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn --production
RUN yarn add bufferutil abalabahaha/erlpack zlib-sync@0.1

COPY . .

CMD [ "npm", "run", "prod" ]