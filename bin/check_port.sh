#!/bin/bash

if [ ! -z "$SRV_NAME" ];
then
    set +e
    K8S_RESPONSE=$(kubectl describe service $SRV_NAME -n $SRV_NAME 2> /dev/null || echo "Service not found")
    echo $K8S_RESPONSE
    NODE_PORT=$(echo $K8S_RESPONSE | grep -E -o '.*NodePort.+' | head -1 | sed -n -E 's|.*NodePort:.* ([0-9]+)/.*$|\1|p')
    if [ ! -z "$NODE_PORT" ];
        then
            echo "Reusing existing port ${NODE_PORT}"
            export FREE_PORT="${NODE_PORT:2}"
        else
            echo 'K8S returned no port data'
    fi
else
    echo "No service name, skipping port check"
fi
