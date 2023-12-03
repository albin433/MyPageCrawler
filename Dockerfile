FROM node:16.20.1

# Install necessary dependencies 
RUN apt-get update && \
    apt-get install -y libnss3 libxkbcommon0 libatk1.0-0 libcups2 libdrm2 libgbm1 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libxss1 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libxss1 libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libxss1 && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY backend ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
