FROM node:20

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json pnpm-lock.yaml* ./
RUN pnpm install

# Copy source code
COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "run", "start"] 