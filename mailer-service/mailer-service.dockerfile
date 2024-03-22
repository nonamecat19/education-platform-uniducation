FROM alpine:latest

RUN mkdir "/app"
RUN mkdir "/app/bin"

COPY bin/mailerApp /app/bin

CMD ["/app/bin/mailerApp"]