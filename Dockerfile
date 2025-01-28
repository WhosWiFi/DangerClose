FROM ubuntu:latest

ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION v18.20.5
RUN mkdir -p /usr/local/nvm && apt-get update && echo "y" | apt-get install curl wget vim -y
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"
ENV NODE_PATH $NVM_DIR/versions/node/$NODE_VERSION/bin
ENV PATH $NODE_PATH:$PATH

WORKDIR /app
COPY ./ /app/
RUN npm i
ENTRYPOINT ["node", "/app/app.js"]