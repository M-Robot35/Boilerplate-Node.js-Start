#!/bin/bash

echo 'Create Imagem Docker'
docker build -t backend .

# run Imagem
# -> docker run -d --rm --name backend -p 3000:3000 --network bridge backend
