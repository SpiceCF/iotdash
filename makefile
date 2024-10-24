.PHONY: frontend-dev
frontend-dev:
	cd frontend && bun run dev

.PHONY: backend-dev
backend-dev:
	cd backend && go run cmd/api/main.go