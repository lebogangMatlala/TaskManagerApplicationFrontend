# ---------- BUILD STAGE ----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Copy package files first for better caching
    COPY package*.json ./
    
    # Install dependencies
    RUN npm ci
    
    # Copy the rest of the files
    COPY . .
    
    # Build the production app
    RUN npm run build
    
    # ---------- SERVE STAGE ----------
    FROM nginx:alpine
    
    # Copy the build output to Nginx html folder
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Expose port 80
    EXPOSE 80
    
    # Start Nginx
    CMD ["nginx", "-g", "daemon off;"]