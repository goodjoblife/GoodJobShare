#!/bin/sh

apk -q update && apk add py-pip
pip install awscli

eval `aws ecr get-login --no-include-email --region ap-northeast-1` || exit 1
