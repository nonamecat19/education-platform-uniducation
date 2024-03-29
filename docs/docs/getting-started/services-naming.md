---
sidebar_position: 5
---

# Microservices naming

## Uniq number
Each microservice have their uniq number, which helps us use them in more intuitive way

1.  Users
2.  Schedule
3.  Learning portal
4.  Assessment
5.  Storage
6.  Auth
7.  Logs
8.  Mail
9.  Test platform
10. Videochat platform

For something global we use number 0

Each service have different structure

```
users
    |-- api 3001 <- 1 - Users
    |-- postgres 5001
    |-- redis 6001
logs
    |-- mongo 27007 <- 7 - Logs
    |-- grafana 9007
auth
    |-- ...
```

For solving problem of same ports we use port depends on current service
- API - 30XX
- Web - 31XX
- Postgres - 50XX
- Redis - 60XX
- MongoDB - 270XX