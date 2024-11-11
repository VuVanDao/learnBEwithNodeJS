FROM node:14-alpine

WORKDIR /vuvandao/backend

# Sao chép package.json và cài đặt các phụ thuộc cùng lúc
COPY package*.json ./
RUN npm install && npm install -g @babel/core @babel/cli

# Sao chép tất cả mã nguồn còn lại
COPY . .

# Chạy build nếu script build-src đã tồn tại trong package.json
RUN npm run build-src

# Khởi động ứng dụng bằng script 'build'
CMD ["npm", "run", "build"]
