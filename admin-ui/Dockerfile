FROM node:17-alpine
RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3001
USER node
CMD ["npm", "start"]
