.PHONY: dev build start lint install clean typecheck format

# Development
dev:
	npm run dev

# Build for production
build:
	npm run build

# Start production server
start:
	npm run start

# Linting
lint:
	npm run lint

# Install dependencies
install:
	npm install

# Type checking
typecheck:
	npx tsc --noEmit

# Clean build artifacts and dependencies
clean:
	rm -rf .next node_modules

# Reinstall everything from scratch
fresh: clean install
