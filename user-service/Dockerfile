FROM node:18-alpine As development

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN yarn

COPY --chown=node:node . .

USER node

FROM node:18-alpine As build

WORKDIR /app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN yarn --only=production && npm cache clean --force

USER node

FROM node:18-alpine As production

COPY --chown=node:node --from=build /app/package.json ./package.json
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]
