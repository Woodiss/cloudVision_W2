FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# EXPOSE 5173   

EXPOSE 3000:3000

CMD ["npm", "run", "dev"]