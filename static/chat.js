const but = document.querySelector('.button_chatbot__open');
const back = document.querySelector('#backgroundrobot');
const exit = document.querySelector('.exit_chat');
const cross = document.querySelector('.exitCross');
const txt = document.querySelector('.text__chat');
const txtSaid = document.querySelector('.text__said');
const bouche = document.querySelector('#speak');
const abso = document.querySelector('.abso');

var open = false;

var greetings =[
        "Moi ça va bien et toi ? &#128170",
        "Je vais super bien. &#128170",
        "Super et toi ? &#128170"
]
var weather =[
  "Il va faire grand soleil et 30°C &#9728",
  "Il neige. &#9924",
  "Il va y avoir de la pluie  &#9748"
]


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const rec = new SpeechRecognition();

/*function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}*/



function robotParle()
{
  console.log('je parle');
  bouche.style.animationName =" apparitionDelay , apparitionDelay ,   apparitionDelay , apparitionDelay , apparitionDelay , apparitionDelay,apparitionDelay , apparitionDelay";
  bouche.style.animationDelay = "1s , 1.3s , 1.5s ,1.56s,1.62s , 2s , 2.22s , 2.26s";
  bouche.style.animationDuration = "0.1s ,0.1s ,0.1s ,0.05s,0.1s , 0.2s , 0.05s ,0.1s";
}
function robotChut()
{
  console.log('je chut');
  bouche.style.animationName ="";
  bouche.style.animationDelay = "";
  bouche.style.animationDuration = "";
}
function ouverture()
{
    open = true;
    back.style.animationDuration="2s";
    back.style.animationName="openAnim";
    exit.style.animationDuration="2s";
    exit.style.animationName="openExitAnim";
    exit.style.animationFillMode="forwards";
    cross.style.animationDuration="2s";
    cross.style.animationName="openExitCrossAnim";
    cross.style.animationFillMode="forwards";
    
    back.style.animationFillMode="forwards";
    but.style.visibility="hidden";
    
    txt.innerHTML="Je suis Nono le petit robot ! <br> Quelle est votre question ?"
    txt.style.animationName="apparitionDelay";
    txt.style.animationDelay="1s";
    txt.style.animationFillMode="forwards";
    robotParle();
    abso.style.visibility="visible";
    rec.start();

}
function fermeture()
{
    open = false;
    back.style.animationName="quitAnim";
    exit.style.animationName="quitExitAnim";
    cross.style.animationName="quitExitCrossAnim";
    txt.style.animationName="";
    robotChut();
    txtSaid.style.visibility="hidden";
    but.style.visibility="visible";
    abso.style.visibility="hidden";
}


rec.onstart = function()
  {
    console.log('voice est activé');
  }
rec.onresult = function(event)
  {
  
    console.log(event);
    
  
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    //c'est ici que l'ont doit envoyer les données à python transcript étant le message textuel déduit du vocal
    if(open == true)
    {
      
      const URL = '/webhook'
      const xhr = new XMLHttpRequest();
      sender = JSON.stringify(transcript)
      xhr.open('POST', URL);
      xhr.send(sender);

      discours(transcript);
    }
    
  }


