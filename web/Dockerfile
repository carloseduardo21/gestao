FROM node:20.1.0

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

ADD . ./

COPY . .

RUN pnpm run build

EXPOSE 3333

CMD ["pnpm", "start"]