SET UP DOCKER:

sudo curl -sSL https://get.docker.com/ | sh

SET UP DOCKER COMPOSE:

sudo apt-get -y install python-pip && \
sudo pip install docker-compose

START ON UBUNTU:

sudo docker-compose up

To run silently -

sudo docker-compose up -d

START ON PI:

docker build --file Dockerfile-pi -d

or change file name in compose.yml to Dockerfile-pi

See by going to http://10.1.129.149:170/
