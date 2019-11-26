FROM node:13.2.0-alpine3.10
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN cd /app/client && npm install && npm run build
#RUN npm install
#RUN npm run build
CMD node index.js
EXPOSE 80 5001 5002 5003 5004 5005
