#!/bin/bash

source bin/activate
export FLASK_APP=app
echo 'Lancement du serveur web sur localhost:5000'
flask run
