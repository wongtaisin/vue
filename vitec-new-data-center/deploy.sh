#!/bin/bash

# echo $1;
echo "开始部署项目"

# build
# yarn build
# name='main-control'
name="vitec-new-data-center"
# test server
server='ljz@47.107.237.18'
path="~/$name"
host='test'

if [ "$1" == "mdg" ];then
	server='root@120.77.82.71'
    # path="/var/www/html/$name"
    host='mdg'
fi


npm run build

ssh $server "mkdir -p ~/$name"
echo "$server:~/$name  /var/www/html/$name/"
scp -r dist/*  "$server:~/$name"
if [ "$2" == "mdg" ];
then
    # backup
    today=`date +%Y%m%d`
    ssh $server "sudo mv /var/www/html/$name ~/backup/$name\_$today"

    echo "backup successfully: $name\_$today"
    ssh $server "sudo mv ~/$name /var/www/html/"
else
    ssh $server "sudo rm -rf /var/www/html/$name/ && sudo mv ~/$name /var/www/html/"
fi

echo "部署 $host[$server] $name. 时间：`date '+%Y-%m-%d %H:%M:%S'`" >> deploy.$host.log
