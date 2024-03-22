FROM alpine:latest

RUN mkdir "/app"
RUN mkdir "/app/bin"

COPY bin/loggerApp /app/bin

CMD ["/app/bin/loggerApp"]