#!/bin/bash

# v0.0.1
# Description : This script remove all your local containers and i'm to lazy for manage errors...
# Knows errors : a lot...

FILE=tmp.txt

# Stock all id container in the tmp file
docker ps -a | awk ' {print  $1 }' > $FILE

# Read file line by line
while read LINE;
do
    # print the id of the container
    echo "[ID OF CONTAINER] : " $LINE
    # remove the container
    docker rm $LINE
done < $FILE

# check if all the container are remove
docker ps -a

# remove temporary file
rm $FILE