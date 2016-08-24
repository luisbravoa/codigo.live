FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y build-essential python ruby golang-go

# PHP
RUN apt-get update && apt-get dist-upgrade -y
RUN apt-get install -y php7.0

# nodejs
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
