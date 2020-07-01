install:
	npm install

run:
	bin/gendiff.js

publish:
	npm publish --dry-run

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test