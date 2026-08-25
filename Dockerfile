FROM qingfeng-registry-vpc.cn-chengdu.cr.aliyuncs.com/test/node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
