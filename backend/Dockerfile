FROM node:20.12.2 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.12.2-alpine
WORKDIR /app
COPY --from=builder /app/build /app
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production
CMD [ "node", "index.js" ]
