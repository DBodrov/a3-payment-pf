#!/bin/bash
if [ ! -z "$FREE_PORT" ];
then
    echo "Reusing free port ${FREE_PORT}"
    export NODEPORTF="${FREE_PORT}"
else
    kubectl get svc --all-namespaces -o go-template='{{range .items}}{{range.spec.ports}}{{if .nodePort}}{{.nodePort}}{{"\n"}}{{end}}{{end}}{{end}}' | grep -E "^30.+$" | sort | sed -n -E 's|[0-9]{2}([0-9]{3})|\1|p' > taken_ports.txt

    # cat fake_ports.txt | sort > taken_ports.txt 
    echo 'Taken ports list for 30*'
    cat taken_ports.txt

    FOUND_FREE_PORT=$(comm -13 taken_ports.txt feature_ports.txt | head -1)

    if [ -z "$FOUND_FREE_PORT" ];
    then
        echo 'All ports taken, can not assign free port'
        exit 1
    else
        echo "Assign new port ${FOUND_FREE_PORT}"
        export NODEPORTF="${FOUND_FREE_PORT}"
    fi
fi
