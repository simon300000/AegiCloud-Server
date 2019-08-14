FROM node:slim
LABEL maintainer="afanyiyu@hotmail.com"
LABEL version="0.1.0"
WORKDIR /app
COPY . /app
RUN npm i
RUN npm audit fix
RUN npm run build
RUN mkdir -p /aegicloud/projects
RUN mkdir -p /aegicloud/conf
RUN mkdir -p /aegicloud/temp
VOLUME /aegicloud/projects
EXPOSE 2120 2121
ENTRYPOINT npm run start