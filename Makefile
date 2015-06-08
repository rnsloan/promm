## docker commands to be run in host OS

dockerBuild:
	docker build -t rnsloan/promm .

dockerRun:
	docker run -it --name promm -v ${PWD}/:/usr/src/promm -w /usr/src/promm rnsloan/promm /bin/bash

dockerStart:
	docker start -ai promm

## to be run inside container

## watch -n 0.5 make run
watch:
	watch -n 0.5 make run

run:
	iojs index.js

test:
	npm test

.PHONY: test
