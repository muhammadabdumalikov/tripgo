# Build stage
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy ALL source files
COPY . .

# Build the project
RUN npm run build

# Final stage (Production)
FROM node:22-alpine
WORKDIR /app

# Copy only the necessary built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 3030
CMD ["npm", "start"]
