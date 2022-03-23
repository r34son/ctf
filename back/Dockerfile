FROM node:17-alpine
WORKDIR /back
COPY package*.json /back/
RUN npm install
ADD . /back/
EXPOSE 80
CMD ["npm", "start"]
