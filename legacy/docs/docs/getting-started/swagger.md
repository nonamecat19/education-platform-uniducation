---
sidebar_position: 4
---

# Swagger

All swagger docs divided by each microservice.

To docs generation you must use command, when you made some api changes

```bash
make generate_swagger
```

To run docs you must run target api service

For all:
```bash
make up
```

For target service:
```bash
make build_*
```
```bash
cd *-service && doker-compose up --build -d
```

You can use by `{SERVICE_URL}/docs` endpoint

For example localhost:3001/docs for users microservices locally

