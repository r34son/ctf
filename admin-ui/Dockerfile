FROM node:17-alpine
ARG UID=1000
ARG GID=1000
ENV UID=${UID:-1000}
ENV GID=${GID:-1000}
RUN deluser --remove-home node \
  && addgroup -S node -g ${GID} \
  && adduser -S -G node -u ${UID} node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
USER node:node
CMD ["npm", "start"]
