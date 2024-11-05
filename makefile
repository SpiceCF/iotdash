.PHONY: frontend-dev
frontend-dev:
	cd frontend && make dev

.PHONY: backend-dev
backend-dev:
	cd backend && make dev

.PHONY: genmock-port
genmock-port:
	cd backend/internal/core/port && ls | grep ".go" | xargs -I {} echo "mockgen -source={} -destination=mock/{}" | sh

.PHONY: gen-api-client
gen-api-client:
	rm -rf ./e2e/src/api-client && docker run --rm -v ./docs/openapi:/openapi -v ./e2e:/e2e openapitools/openapi-generator-cli generate -i /openapi/openapi.json -g typescript-fetch -o /e2e/src/api-client

.PHONY: sync-openapi
sync-openapi:
	curl http://localhost:8080/swagger/json -o ./docs/openapi/openapi.json && make gen-api-client

.PHONY: build-api-client
build-api-client:
	cd e2e && yarn build

.PHONY: link-api-client
link-api-client:
	cd frontend && yarn link:api-client

.PHONY: sync-api-client
sync-api-client:
	make build-api-client && make link-api-client