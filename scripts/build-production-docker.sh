#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pwd
echo $DIR
cd $DIR/..
pwd

docker-compose -f docker-compose-pi.yml up -d