#!/bin/sh

set -euo pipefail

REGISTRY="reg.goodjob.life/goodjob/goodjobshare"

# Build Docker Image
docker-compose -f .circleci/docker-compose-stage.yml build
docker tag "goodjobshare:stage" "${REGISTRY}:stage"
docker tag "goodjobshare:stage" "${REGISTRY}:${CIRCLE_SHA1}"

# Push
docker push "${REGISTRY}:stage"
docker push "${REGISTRY}:${CIRCLE_SHA1}"
