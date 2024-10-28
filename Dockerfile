FROM nginx:latest
LABEL maintainer="zihluwang"
LABEL org.opencontainers.image.source="https://github.com/zihluwang/score-sense"
COPY ./dist/ /usr/share/nginx/html/console
COPY ./conf.d/ /etc/nginx/conf.d/
COPY ./cert.d/ /etc/nginx/ssl/
