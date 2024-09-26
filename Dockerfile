FROM nginx:latest
LABEL maintainer="zihluwang"
COPY ./dist/ /usr/share/nginx/html/console
COPY ./conf.d/ /etc/nginx/conf.d/
COPY ./cert.d/ /etc/nginx/ssl/
