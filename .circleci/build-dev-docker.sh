#!/bin/sh

set -euo pipefail

REGISTRY="reg.goodjob.life/goodjob/goodjobshare"

# Build Docker Image
docker-compose -f .circleci/docker-compose-dev.yml build
docker tag "goodjobshare:dev" "${REGISTRY}:dev"
docker tag "goodjobshare:dev" "${REGISTRY}:${CIRCLE_SHA1}"

# Push
docker push "${REGISTRY}:dev"
docker push "${REGISTRY}:${CIRCLE_SHA1}"
