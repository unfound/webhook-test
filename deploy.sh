#! /bin/shell

WEBHOOK_PATH=~/product/webhook-test
cd $WEBHOOK_PATH
git reset --hard origin/master
git clean -f
git pull
git checkout master