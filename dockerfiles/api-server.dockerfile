FROM node:18.14-alpine

WORKDIR /server

COPY package.json .

RUN npm install

# COPY를 사용하는 이유는 프로덕션용 스냅샷 이미지를 생성하기 위함!
COPY . .

ARG DEFAULT_PORT=8000

# 환경변수는 되도록 env 파일을 통해 관리
ENV PORT=${DEFAULT_PORT}

EXPOSE $PORT

# docker run -d --rm -p 8000:8000 --name api-server -v /app/node_modules --build-arg DEFAULT_PORT=8000 --env-file ./.env.production 