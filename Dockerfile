FROM node:20-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN npx prisma generate

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
