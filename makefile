.PHONY: frontend-dev
frontend-dev:
	cd frontend && bun run dev

.PHONY: backend-dev
backend-dev:
	cd backend && go run cmd/api/main.go

.PHONY: genmock-port
genmock-port:
	cd backend/internal/core/port && ls | grep ".go" | xargs -I {} echo "mockgen -source={} -destination=mock/{}" | sh

.PHONY: gen-api-client
gen-api-client:
	docker run --rm -v ./docs/openapi:/openapi -v ./e2e:/e2e openapitools/openapi-generator-cli generate -i /openapi/openapi.yaml -g typescript-fetch -o /e2e/api-client