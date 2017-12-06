#!/bin/sh

REGISTRY="059402281999.dkr.ecr.ap-northeast-1.amazonaws.com"

# Build Docker Image
docker-compose -f .circleci/docker-compose-stage.yml build
docker tag "${REGISTRY}/goodjob/goodjobshare:stage" "${REGISTRY}/goodjob/goodjobshare:${CIRCLE_SHA1}"

# Login
./.circleci/prepare-docker-login.sh

# Push
docker-compose -f .circleci/docker-compose-stage.yml push
docker push "${REGISTRY}/goodjob/goodjobshare:${CIRCLE_SHA1}"
