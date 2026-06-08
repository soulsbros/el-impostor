FROM nginx:alpine

LABEL author="Soulsbros <https://soulsbros.ch>"

COPY index.html /usr/share/nginx/html
COPY style.css /usr/share/nginx/html
COPY favicon.ico /usr/share/nginx/html
COPY *.js /usr/share/nginx/html
EXPOSE 80
