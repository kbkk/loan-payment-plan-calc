FROM node:12.18.2-stretch

WORKDIR /usr/src/app

COPY . .

# todo: use multi-stage build to get rid of dev dependencies in the image
RUN npm ci

RUN npm run build

CMD ["node", "dist/app.js"]
