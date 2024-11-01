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
	rm -rf ./e2e/api-client && docker run --rm -v ./docs/openapi:/openapi -v ./e2e:/e2e openapitools/openapi-generator-cli generate -i /openapi/openapi.json -g typescript-fetch -o /e2e/api-client

.PHONY: sync-openapi
sync-openapi:
	curl http://localhost:8080/swagger/json -o ./docs/openapi/openapi.json && make gen-api-client

# .PHONY: gen-api-client-dev
# gen-api-client:
# 	docker run --rm -v ./e2e:/e2e openapitools/openapi-generator-cli generate -i http://host.docker.internal:8080/swagger/json -g typescript-fetch -o /e2e/api-client
