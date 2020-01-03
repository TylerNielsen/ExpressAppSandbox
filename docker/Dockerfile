FROM node:10.12.0-alpine AS builder
WORKDIR /home/nodejs/app/
ENV NODE_ENV prod
COPY package*.json ./
RUN npm install
ARG port=80
EXPOSE $port
COPY . ./
RUN npm run compile

FROM node:10.12.0-alpine
WORKDIR /home/nodejs/app
COPY --from=builder /home/nodejs/app/package*.json ./
COPY --from=builder /home/nodejs/app/dist ./dist
RUN npm install --production-only
CMD node ./dist/index.js
