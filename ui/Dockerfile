FROM node:14-alpine
WORKDIR /ui
COPY package*.json /ui/
RUN npm install
ADD . /ui/
EXPOSE 3000
CMD ["npm", "start"]
