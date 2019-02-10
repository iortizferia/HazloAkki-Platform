FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY /dist/hazloakki-platform /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]