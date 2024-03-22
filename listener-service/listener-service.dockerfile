FROM alpine:latest

RUN mkdir "/app"
RUN mkdir "/app/bin"

COPY bin/listenerApp /app/bin

CMD ["/app/bin/listenerApp"]