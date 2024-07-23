FROM nginx:alpine

COPY dist/ /usr/share/nginx/html/
COPY docker/default.conf.template /etc/nginx/templates/default.conf.template
WORKDIR /etc/nginx/conf.d

ENV LISTEN_PORT=80
ENV SERVER_IP=172.18.0.4

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
