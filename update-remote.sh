sh push.sh "$1"

ssh root@81.177.165.71 "cd /home/rgp-frint && git pull origin main && docker-compose up -d --build --no-cache && docker-system prune -a -f"