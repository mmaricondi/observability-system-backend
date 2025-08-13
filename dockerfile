FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build
# RUN mkdir -p dist/services/mail/templates \
#     && cp src/services/mail/templates/templateSendGrip.html dist/services/mail/templates/

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
