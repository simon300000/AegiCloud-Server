FROM node
WORKDIR /app
COPY . /app
RUN npm i
RUN npm run build
RUN mkdir -p /aegicloud/projects
RUN mkdir -p /aegicloud/conf
RUN mkdir -p /aegicloud/temp
VOLUME [ "/aegicloud/projects" ]
EXPOSE 2120 2121
ENTRYPOINT npm run start