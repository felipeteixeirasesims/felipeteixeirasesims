FROM node:16.13.1-alpine as build

USER root

WORKDIR /app

COPY . .

RUN npm
RUN npm build

FROM node:16.13.1-alpine as runner

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/prismaconfig.js /app/prismaconfig.js
COPY --from=build /app/.env /app/.env
COPY --from=build /app/start.sh /app/start.sh

EXPOSE 3333

ENTRYPOINT ["sh","start.sh"]
