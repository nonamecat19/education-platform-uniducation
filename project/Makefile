BROKER_BINARY=brokerApp
AUTH_BINARY=authApp
LOGGER_BINARY=loggerApp
MAILER_BINARY=mailerApp

up:
	@echo "Starting Docker images..."
	docker-compose up -d
	@echo "Docker images started!"

up_build: build_broker build_auth build_logger build_mailer
	@echo "Stopping docker images (if running...)"
	docker-compose down
	@echo "Building (when required) and starting docker images..."
	docker-compose up --build -d
	@echo "Docker images built and started!"

down:
	@echo "Stopping docker compose..."
	docker-compose down
	rm -rf ../broker-service/bin
	rm -rf ../authentication-service/bin
	rm -rf ../logger-service/bin
	rm -rf ../mailer-service/bin
	@echo "Done!"

build_broker:
	@echo "Building broker binary..."
	cd ../broker-service && mkdir bin && env GOOS=linux CGO_ENABLED=0 go build -o bin/${BROKER_BINARY} ./cmd/api
	@echo "Done!"

build_auth:
	@echo "Building auth binary..."
	cd ../authentication-service && mkdir bin && env GOOS=linux CGO_ENABLED=0 go build -o bin/${AUTH_BINARY} ./cmd/api
	@echo "Done!"

build_logger:
	@echo "Building logger binary..."
	cd ../logger-service && mkdir bin && env GOOS=linux CGO_ENABLED=0 go build -o bin/${LOGGER_BINARY} ./cmd/api
	@echo "Done!"

build_mailer:
	@echo "Building mailer binary..."
	cd ../mailer-service && mkdir bin && env GOOS=linux CGO_ENABLED=0 go build -o bin/${MAILER_BINARY} ./cmd/api
	@echo "Done!"

restart: down up_build