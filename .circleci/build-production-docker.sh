#!/bin/sh

REGISTRY="059402281999.dkr.ecr.ap-northeast-1.amazonaws.com"

# Build Docker Image
docker-compose -f .circleci/docker-compose-production.yml build
docker tag "${REGISTRY}/goodjob/goodjobshare:production" "${REGISTRY}/goodjob/goodjobshare:production-${CIRCLE_SHA1}"

# Login
./.circleci/prepare-docker-login.sh

# Push
docker push "${REGISTRY}/goodjob/goodjobshare:production-${CIRCLE_SHA1}"
