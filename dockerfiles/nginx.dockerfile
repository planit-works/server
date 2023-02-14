FROM nginx:1.23.3-alpine

WORKDIR /etc/nginx

COPY nginx.conf .

# RUN mv nginx.conf default.conf

# static을 제공할 경우
# WORKDIR /public

# COPY src .