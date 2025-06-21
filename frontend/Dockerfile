FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

EXPOSE 5052

CMD ["npm", "run", "preview", "--", "--port=5052", "--host=0.0.0.0"]