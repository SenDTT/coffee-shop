FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
RUN npm install

COPY . .

COPY wait-for.sh ./
RUN chmod +x wait-for.sh

CMD ["./wait-for.sh", "mongodb", "npm", "run", "dev"]
