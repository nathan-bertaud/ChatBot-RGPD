# coding: utf-8
import nltk
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()
nltk.download('punkt')
import numpy as np
import tflearn as tfl
import tensorflow as tf
import random
import json
import pickle
import sys
if sys.version_info.major < 3:
    reload(sys)
from flask import Flask, render_template, request
app = Flask(__name__)
import spacy
from spacy_lefff import LefffLemmatizer
from spacy.language import Language


nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk import word_tokenize
from nltk.tokenize import sent_tokenize

information = ''
resp = ''
data = {'color': 'coral','color2': '#FF4B50'}
logo = {'logo': 'robotique.svg'}
num = '0656486985'
mail = 'exemple@entreprise.com'

@Language.factory('french_lemmatizer')
def create_french_lemmatizer(nlp, name):
    return LefffLemmatizer()

french_stopwords = set(stopwords.words('french'))
filtre_stopfr =  lambda text: [token for token in text if token.lower() not in french_stopwords]

import numpy as np
import tflearn as tfl
import tensorflow as tf
import random
import json
import pickle

def choisirReponse(tag):
    if (tag == "fonctionnalites"):
        fonctionnalites()
    elif (tag == "informations"):
        informations()
    elif (tag == "modifinformations" or tag =="modifier informations"):
        modifinformations()
    elif (tag == "supprinformations" or tag =="supprimer informations"):
        supprinformations()
    elif (tag == "consentements"):
        consentements()
    elif (tag == "retirerconsentements" or tag =="retirer consentements"):
        retirerconsentements()
    elif (tag == "rgpd"):
        rgpd()
    elif (tag == "question"):
        funcQuestion()
    elif (tag == "droits"):
        droits()
    else :
        funcQuestion()


def ajouterQuestion(ajouteQuestion, question ): #<print>
    with open('intents.json') as inputfile:
        data = json.load(inputfile)
        if (ajouteQuestion == "o"):
            sujet = information    #input("sujet : ") #<input> c'est pour avoir le sujet (RPGD, fonctionnalites, etc) pour l'ajouter au JSON après
            sujet = sujet.lower()
            question = question #ce qui utilise le inpBuffer dans le chat()
            indice = questToIndic(sujet)
            data['intents'][indice][sujet][0]['patterns'].append(question)
            resp = "Votre question a été ajoutée, merci :')" #<output>
            #moyen de faire attendre avant de passer à la suite ?
            resp = "La réponse à votre question était donc : " #<output>
            choisirReponse(sujet)
            inputfile.close()
    with open('intents.json', 'w') as outfile:
        json.dump(data, outfile, indent=4)
        outfile.close()



def questToIndic(x):
    return {
        'fonctionnalites': 0,
        'question': 1,
        'droits': 2,
        'informations': 3,
        'modifinformations': 4,
        'supprinformations': 5,
        'consentements': 6,
        'retirerconsentements': 7,
        'rgpd' : 8
    }.get(x, 0)    # 0 is default if x not found

def indicToQuest(x):
    return {
        0: 'fonctionnalites',
        1: 'question',
        2: 'droits',
        3: 'informations',
        4: 'modifinformations',
        5: 'supprinformations',
        6: 'consentements',
        7: 'retirerconsentements',
        8: 'rgpd'
    }.get(x, 'fonctionnalites') 

french_stopwords = set(stopwords.words('french'))

with open("intents.json") as file:
    data = json.load(file)

    features = []
    labels = []
    docs_x = []
    docs_y = []

    for indQuest in range(0, 9):
        for pattern in data["intents"][indQuest][indicToQuest(indQuest)][0]["patterns"]:
            words = filtre_stopfr(word_tokenize(pattern, language="french"))
            features.extend(words)
            docs_x.append(words)
            docs_y.append(indicToQuest(indQuest))

        if indicToQuest(indQuest) not in labels:
            labels.append(indicToQuest(indQuest))

    features = [stemmer.stem(f.lower()) for f in features if f != "?"]
    features = sorted(list(set(features)))

    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_x):
        bag = []

        words = [stemmer.stem(w) for w in doc]

        for f in features:
            if f in words:
                bag.append(1)
            else:
                bag.append(0)

        output_row = out_empty[:]
        output_row[labels.index(docs_y[x])] = 1

        training.append(bag)
        output.append(output_row)
        
        
training = np.array(training)
print(training)
output = np.array(output)


net = tfl.input_data(shape=[None, len(training[0])])
net = tfl.fully_connected(net, 8) # hidden layers with 8 neurons
net = tfl.fully_connected(net, 8)
net = tfl.fully_connected(net, 8)
net = tfl.fully_connected(net, len(output[0]), activation="softmax")
net = tfl.regression(net)

model = tfl.DNN(net)

model.fit(training, output, n_epoch=300, batch_size=8, show_metric=True) #passing the training data
model.save("model.tflearn")
    
def bag_of_words(s, words):
    bag = [0 for _ in range (len(words))]
        
    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]
    
    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
                
    return np.array(bag)

#<output> Normalement j'ai bien changé, j'ai prit exemple sur l'ancien mais jsp si ca a changé
def fonctionnalites():
    global resp
    resp = "Je suis là pour repondre à vos questions !\n"


def informations():
    global resp
    resp = "Avec plaisir, voici les informations que l'entrepise a sur vous : (requete SQL) \n"


def modifinformations():
    global resp
    global mail
    resp = "Monsieur. Veuillez envoyer un mail a " + mail + " pour modifier vos informations\n"


def supprinformations():
    global resp
    global mail
    resp = "vos informations seront supprimés si vousu envoyez une demande à l'email : "+ mail +"\n"


def consentements():
    rand = random.randint(0, 100)
    global resp
    if (rand <= 50):
        resp = "J'ai ici la liste de vos consentements : (requete SQL) \n"
    if (rand > 50):
        resp = "Avec plaisir, voici vos consentements (requete SQL) \n"


def retirerconsentements():
    global resp
    global num
    resp = "Pour retirer vos consentements veuillez appeller le : " + num + "\n"


def rgpd():
    global resp
    resp = "L'acronyme RPGD signifie reglement general pour la protection des donnes personnelles.\n"
    print("RGPD")


def funcQuestion():
    global resp
    resp = "Monsieur. Je peux répondre aux questions sur les sujets suivants : \n 1. Mes fonctionnalités \n 2. Vos informations \n 3. La RGPD \n 4. Vos consentements\n"

def droits():
    global resp
    resp = "Ceci sont vos droits : (requete SQL)\n"

#</output>

def chat(information):
    inp = information #<input> Normalement il est bon ?
    #print("Commencez à parler avec moi ! Si vous voulez arrêter, dites stop (:. Et si je donne la mauvaise réponse dites moi d'attendre !") <print> jsp s'il y a moyen d'afficher ca
    if inp.lower() == "stop":
        resp = "A bientôt ! :)"#<output>
        #moyen d'arrêter le chatbot et le fermer ?
    if inp.lower() == "attends":
        resp = "J'ai mal répondu à votre question ? \nVous vous attendiez à quoi ?" #<output>
        ajouterQuestion("o", inpBuffer )
        print("\n")
        inp = information #<input>
        
    results = model.predict([bag_of_words(inp,features)])[0]
    results_index = np.argmax(results)
    tag = labels[results_index]
    inpBuffer = inp # Il sert dans le "attends" pour avoir la question qui a été posé
    if results[results_index] > 0.9:
        choisirReponse(tag)
    else:
        choisirReponse("erreur")
        ajouteQuestion = information #input("Je n'ai pas compris la question, voulez vous l'ajouter à ma base de données ? (o/n) : ") # <input> Jsp si ca va fonctionner
        ajouterQuestion(ajouteQuestion, inp )


@app.route('/webhook', methods=['GET','POST'])
def popup():
    global information
    encoding = 'ISO-8859-1'
    information = request.get_data()
    information = information.decode(encoding)
    information = information.replace('"','')
    print(information)
    chat(information)
    global resp
    print(resp)
    print(information)
    data1 = {'call': str(resp)}
    return data1

@app.route('/admincolor1728', methods=['GET'])
def sendColor():
    global data
    print(data)
    return data

@app.route('/adminlogo1728', methods=['GET'])
def sendLogo():
    global logo
    return logo

@app.route('/admin', methods=['POST'])
def admin():
    dataColor = {'color': str(request.form['color']),'color2': str(request.form['color2']) }
    print(dataColor)
    global data 
    data = dataColor

    datalogo = {'logo': str(request.form['logo'])}
    print(datalogo)
    global logo 
    logo = datalogo

    datanum = str(request.form['numero'])
    print(datanum)
    global num
    num = datanum

    datamail = str(request.form['mail'])
    print(datamail)
    global mail
    mail = datamail
 
    return render_template('index.html')


@app.route('/')
def home():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)








