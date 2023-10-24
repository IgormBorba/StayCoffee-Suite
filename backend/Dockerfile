<<<<<<< HEAD
# Etapa de construção
FROM node:18-slim as build
WORKDIR /usr/src/api
COPY . .
RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm run build

# Etapa de produção
FROM node:18-slim
WORKDIR /usr/src/api
COPY --from=build /usr/src/api/dist ./dist
COPY package*.json ./
RUN npm install --production --quiet --no-optional --no-fund --loglevel=error
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
=======
# Etapa de construção
FROM node:18-slim as build
WORKDIR /usr/src/api
COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm run build

# Etapa de produção
FROM node:18-slim
WORKDIR /usr/src/api
COPY --from=build /usr/src/api/dist ./dist

COPY package*.json ./
RUN npm install --production --quiet --no-optional --no-fund --loglevel=error
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
>>>>>>> 00b7aaeab313e5cb93b6c9dffd4433c1cbc29f32
