FROM node
ADD . /src
WORKDIR /src
RUN npm install -g bower
RUN npm install -y && bower install --allow-root
cmd ["node_modules/.bin/ember", "server"]
