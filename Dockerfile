FROM alpine
RUN apk add nodejs-npm
RUN npm install -g firebase-tools
RUN firebase init
RUN firebase serve 
