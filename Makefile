## docker commands to be run in host OS

dockerRun:
	docker run -it --name promm -v ${PWD}/:/usr/src/promm -w /usr/src/promm iojs /bin/bash

dockerStart:
	docker start -ai promm

## to be run inside container

runSandbox:
	iojs sandbox.js

watch:
	watch -n 0.5 make runSandbox

test:
	npm test

.PHONY: test


