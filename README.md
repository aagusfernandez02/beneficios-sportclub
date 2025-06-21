# Beneficios SportClub

## ¿Cómo levantar el proyecto?
### Requerimientos
- Docker
- docker-compose

### Procedimiento
Para levantar este proyecto debemos movernos a la carpeta donde se encuentra el `docker-compose.yml` y ejecutar el comando `docker-compose up -d`. De esta forma se levantará en: `http://localhost:5052` la aplicación del frontend y en el puerto `5000` el backend.


## Arquitectura
Se utilza un backend en Flask que actúa de intermediario, normalizando y validando los datos obtenidos de la API de SportClub. El frontend consulta a los endpoints levantados en Flask para obtener los beneficios, utilizando query params para filtrar las consultas, tanto por pagina, como por nombre de comercio, estado del beneficio, etc.
En cada carpeta hay un archivo de configuración:
- **_Backend_**: Ubicado en `/backend/app/utils/config.py`
- **_Frontend_**: Ubicado en `/frontend/.env`

En el **frontend** se manejan los beneficios globalmente, es decir que podemos hacer un `fetch` y/o acceder a los beneficios desde cualquier sitio de la App. De misma manera, los filtros o parámetros (nombre de comercio, página, estado del beneficio, etc) se manejan globalmente, para asegurar su persistencia a lo largo de la navegación. Esto hace que la escalabilidad de la aplicación no sea complicada ni engorrosa.
En el **backend** tenemos un endpoint que nos trae todos los beneficios y otro que nos trae un beneficio según su id. Aquí podemos enviar _queryParams_ para acotar la busqueda.
