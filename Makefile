build:
	rm -rf ./dist/* && yarn build && cp -R ./simpleserver/* ./dist/ && cp ./ops/scripts/run.ps1 ./dist/run.ps1
build-server:
	cp -R ./simpleserver/* ./dist/ && cp ./Makefile ./dist/Makefile
run:
	php -S localhost:80