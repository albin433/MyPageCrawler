# Use the official Node.js image with the specified version
FROM node:16.20.1

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y libnss3 libxkbcommon0 libatk1.0-0 libcups2 libdrm2 libgbm1 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libxss1 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libxss1 libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcb-dri3-0 libxcomposite1 libxcursor1 libxdamage1 libxi6 libxtst6 libxrandr2 libasound2 libpangocairo-1.0-0 libxss1 && \
    rm -rf /var/lib/apt/lists/*

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy backend package.json and package-lock.json to the working directory
COPY backend ./

# Install backend dependencies
RUN yarn install

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["yarn", "start"]
