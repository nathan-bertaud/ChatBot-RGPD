<em>Afin de lancer l'application il vous faut installer :</em>

## INSTALLER NODE.JS

**install npm**

**python3 et pip** (Si cela ne fonctionne pas essayer apt update puis apt upgrade pour mettre à jour toutes les dépendances)

Créer un environnement virtuel :

(cela nécessite virtualenv)

**virtualenv venv --python=python3.8**

Travailler dans l'environnement :

## très important il faut parfois être superuser :
## sudo su

**source venv/bin/activate**

Puis installer la dépendance flask :

**pip install flask**

**pip install nltk**



<em>Afin de lancer la v1 du chatbot il faut installer les dépendances nécessaires :</em> 

la première fois qu'on lance le code il faut sortir de commentaire la ligne **nltk.download('punkt')** du fichier app.py à la racine du projet

puis il faut : 
**pip install -r requirements.txt**

(Si l'installation ne fonctionne pas il faut vérifier les dépendances)

LANCER CETTE COMMANDE DANS LE TERMINAL : 

**./start.sh**

Ouvrez un autre terminal dans le dossier ./PTS4/chatbot

LANCER CETTE COMMANDE DANS LE TERMINAL : 

**npm start**

# Sur MAC OS

On suit les étapes écrites au-dessus.

On se place dans l'environnement virtuel avec **source venv/bin/activate**

Puis il faudra installer tflearn, ce qui peut poser problème.

Si la commande suivante ne fonctionne pas:

**pip install tflearn**

On essaye d'abords :

**pip install Pillow**

Si on ne peut pas installer Pillow, alors on va télécharger 8.0.1 wheel sur :  https://pypi.org/project/Pillow/8.0.1/#files

Puis on le renomme en **Pillow-8.0.1-cp38-cp38-macosx_11_0_arm64.whl**, et on le place dans le répertoire venv.

Ensuite on execute la commande : **sudo python3 -m pip install Pillow-8.0.1-cp38-cp38-macosx_11_0_arm64.whl**

Et finalement on refait : **pip install tflearn**


## Si ça fonctionne toujours pas

On fait : 

**python3 -m pip install packaging**

**python3 -c"from packaging import tags; print('\n'.join([str(t) for t in tags.sys_tags()]))" |head -5**

(Exemple d'affichage après utilisation : cp38-cp38-macosx_11_0_x86_64)

On renomme alors le fichier Pillow avec l'affichage de la commande, donc par exemple :

**mv Pillow-8.0.1-cp38-cp38-macosx_10_10_x86_64.whl Pillow-8.0.1-cp38-cp38-macosx_11_0_x86_64.whl**

et on installe : **python3 -m pip install Pillow-8.0.1-cp38-cp38-macosx_11_0_x86_64.whl**


LANCER CETTE COMMANDE DANS LE TERMINAL : 

**npm start**