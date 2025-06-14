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