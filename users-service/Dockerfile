FROM alpine:latest

RUN mkdir "/app"
RUN mkdir "/app/bin"
RUN mkdir "/env"

COPY bin/usersApp /app/bin
COPY env env

CMD ["/app/bin/usersApp"]