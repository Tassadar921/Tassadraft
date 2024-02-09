FROM node:alpine
RUN mkdir -p /home/ionic/app
COPY package*.json ./home/ionic/app/
WORKDIR /home/ionic/app

RUN npm i -g @ionic/cli
RUN npm i -g @angular/cli
RUN npm ci
COPY . /home/ionic/app/

CMD ["ionic", "serve", "--all", "--external"]
