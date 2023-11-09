FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install Dependencies
RUN apt-get update && apt-get install curl libjemalloc-dev -y && apt-get clean
ENV LD_PRELOAD="/usr/lib/x86_64-linux-gnu/libjemalloc.so" 

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "yarn", "prod" ]