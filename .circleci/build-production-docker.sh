#!/bin/sh

set -euo pipefail

REGISTRY="reg.goodjob.life/goodjob/goodjobshare"

# Build Docker Image
docker-compose -f .circleci/docker-compose-production.yml build
docker tag "goodjobshare:production" "${REGISTRY}:production-${CIRCLE_SHA1}"

# Push
docker push "${REGISTRY}:production-${CIRCLE_SHA1}"
