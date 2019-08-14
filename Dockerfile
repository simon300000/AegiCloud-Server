FROM node:slim AS build
LABEL maintainer="afanyiyu@hotmail.com"
LABEL version="0.1.0"
WORKDIR /app
COPY . /app
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm i
RUN npm audit fix
RUN npm run build

FROM node:slim AS prod
WORKDIR /app
COPY --from=build /app/.nuxt /app/.nuxt
COPY --from=build /app/server /app/server
COPY --from=build /app/nuxt.config.js /app/nuxt.config.js
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/package-lock.json /app/package-lock.json
RUN npm i --production
RUN npm audit fix
RUN mkdir -p /aegicloud/projects
RUN mkdir -p /aegicloud/conf
RUN mkdir -p /aegicloud/temp
VOLUME /aegicloud/projects
EXPOSE 2120 2121
CMD pm2-runtime start ecosystem.config.js