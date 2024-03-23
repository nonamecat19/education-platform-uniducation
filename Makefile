BROKER_BINARY=broker
AUTH_BINARY=auth
LOGGER_BINARY=logger
MAILER_BINARY=mailer
LISTENER_BINARY=listener

SERVICES=auth broker listener logger mailer

DOCKER_COMPOSE_FILES=docker-compose $(foreach service,$(SERVICES),-f $(service)-service/docker-compose.yml)

define build_binary
	echo "Building ${1}: started" && \
	cd $(1)-service && \
	mkdir bin && \
	env GOOS=linux CGO_ENABLED=0 go build -o bin/$(1)App ./cmd${2} && \
	echo "Building ${1}: done!"
endef

define copy_env
	cd ${1}-service/env && \
	find . -type f -name ".[^.]*.env" ! -name "*.example.env" -exec rm {} + && \
	find . -type f -name "*.example.env" -exec sh -c 'cp "$$0" $$(echo "$$0" | sed "s/.example//")' {} \;

endef

up: build_broker build_auth build_logger build_mailer build_listener
	@echo "Building and starting docker images..."
	${DOCKER_COMPOSE_FILES} up --build -d
	@echo "Docker images built and started!"

down:
	@echo "Stopping docker compose..."
	${DOCKER_COMPOSE_FILES} down
	rm -rf $(foreach service,$(SERVICES),$(service)-service/bin)
	@echo "Done!"

build_broker:
	$(call build_binary,$(BROKER_BINARY),'/api')

build_auth:
	$(call build_binary,$(AUTH_BINARY),'/api')

build_logger:
	$(call build_binary,$(LOGGER_BINARY),'/api')

build_mailer:
	$(call build_binary,$(MAILER_BINARY),'/api')

build_listener:
	$(call build_binary,$(LISTENER_BINARY))

restart: down up

prepare_env:
	$(foreach SERVICE,$(SERVICES),$(call copy_env,$(SERVICE)))
