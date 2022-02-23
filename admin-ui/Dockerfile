FROM node:14-alpine
WORKDIR /admin-ui
COPY package*.json /admin-ui/
RUN npm install
ADD . /admin-ui/
EXPOSE 3000
CMD ["npm", "start"]
