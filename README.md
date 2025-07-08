/proyecto/
│
├── docker-compose.yml
├── .env                      ← variables globales opcionales
├── backend/                 ← Backend que consulta al SQLSERVER
│   ├── Dockerfile
│   ├── src/
│   └── .env
├── ws/                 ← Back para mandar whatsapp
│   ├── Dockerfile
│   ├── src/
│   └── .env
├── front-precios/                 ← Frontend Vue buscador de precios
│   ├── Dockerfile
│   ├── src/
├── admin-precios/                 ← Frontend Vue Admin 
│   ├── Dockerfile
│   ├── src/
├── portal/                 ← Frontend Vue Admin 
│   ├── Dockerfile
│   ├── src/


cloudAbril/
├── front-precios/
│   ├── dist/           # Para los archivos compilados
│   ├── Dockerfile      # Para construir la imagen
│   ├── nginx.conf      # Configuración de nginx
│   └── .dockerignore   # Archivos a ignorar
│
├── front-admin/
│   ├── dist/           # Para los archivos compilados
│   ├── Dockerfile      # Para construir la imagen
│   ├── nginx.conf      # Configuración de nginx
│   └── .dockerignore   # Archivos a ignorar
│
└── portal/
    ├── dist/           # Para los archivos compilados
    ├── Dockerfile      # Para construir la imagen
    ├── nginx.conf      # Configuración de nginx
    └── .dockerignore   # Archivos a ignorar


``` docker-compose up -d --no-deps --build backend ```