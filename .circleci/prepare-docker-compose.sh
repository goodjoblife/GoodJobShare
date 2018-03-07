#!/bin/sh

set -x

apk -q update && apk add docker py-pip
pip install docker-compose
