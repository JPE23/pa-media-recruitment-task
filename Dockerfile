FROM node:15.13-alpine
WORKDIR /press-association-recruitment-task
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]