npm run build

scp -i ~/.ssh/ryan_id_rsa -r dist zpr@47.107.237.18:/home/zpr/

ssh zpr@47.107.237.18 -i ~/.ssh/ryan_id_rsa 'sudo rm -rf /var/www/html/vitec-new-data-center'
ssh zpr@47.107.237.18 -i ~/.ssh/ryan_id_rsa 'sudo mv /home/zpr/dist/ /var/www/html/vitec-new-data-center/'
