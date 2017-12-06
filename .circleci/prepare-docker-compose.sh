#!/bin/sh

set -x

apk -q update && apk -q  add curl ca-certificates tar py-pip

# install docker
VER="17.03.0-ce"
curl -L -o /tmp/docker-$VER.tgz https://get.docker.com/builds/Linux/x86_64/docker-$VER.tgz
tar -xz -C /tmp -f /tmp/docker-$VER.tgz
mv /tmp/docker/* /usr/bin

# prepare docker-compose
pip install docker-compose
