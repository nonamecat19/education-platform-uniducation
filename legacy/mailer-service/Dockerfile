FROM alpine:latest

RUN mkdir "/app"
RUN mkdir "/app/bin"

COPY bin/mailerApp /app/bin
COPY templates /templates

CMD ["/app/bin/mailerApp"]