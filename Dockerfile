FROM keymetrics/pm2:latest-slim
LABEL maintainer="afanyiyu@hotmail.com"
LABEL version="0.1.0"
WORKDIR /app
COPY . /app
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
RUN npm audit fix
RUN npm run build
RUN mkdir -p /aegicloud/projects
RUN mkdir -p /aegicloud/conf
RUN mkdir -p /aegicloud/temp
VOLUME /aegicloud/projects
EXPOSE 2120 2121
CMD pm2-runtime start ecosystem.config.js