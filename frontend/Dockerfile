FROM node:20.18.0

WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
RUN npm install

COPY . .

# Porta exposta pelo servidor do React
EXPOSE 80

# Inicia o servidor de desenvolvimento ou build para produção
CMD ["npm", "start"]