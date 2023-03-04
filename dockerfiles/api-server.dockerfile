FROM node:18.14-alpine

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_PORT=8000

# 환경변수는 되도록 env 파일을 통해 관리
ENV PORT=${DEFAULT_PORT}

EXPOSE $PORT

CMD [ "npm", "run", "start:dev" ]

# docker run -d --rm -p 8000:8000 --name api-server -v /app/node_modules --build-arg DEFAULT_PORT=8000 --env-file ./.env.production
