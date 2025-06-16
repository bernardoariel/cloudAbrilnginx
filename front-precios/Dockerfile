FROM nginx:stable-alpine

# Copiar los archivos estáticos
COPY dist/ /usr/share/nginx/html/

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 