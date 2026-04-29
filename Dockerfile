FROM node:18-alpine

WORKDIR /usr/src/app

COPY src/package*.json ./

RUN npm install --production

COPY src/ .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["npm", "start"]
