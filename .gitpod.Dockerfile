FROM gitpod/workspace-mongodb

USER gitpod

RUN mkdir -p /workspace/data && mongod --dbpath /workspace/data
