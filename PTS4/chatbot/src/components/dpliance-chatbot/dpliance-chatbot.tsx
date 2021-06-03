import {Component, getAssetPath, h, State , Host ,Element } from '@stencil/core';

@Component({
  tag: 'dpliance-chatbot',
  styleUrl: 'dpliance-chatbot.css',
  assetsDirs: ['img'],
})

export class DplianceChatbot {

  @State() open: boolean = false;
  @State() init: string = 'init';
  @State() rec: boolean = false;
  @State() awnser: string;
  @State() msg: string = 'Bonjour';
  @State() color1 = null;
  @State() color2 = null;
  @State() colorSVG = null;
  @State() linearGradColor = null;
  @State() logoPath: string = './img/robotique.svg';
  @Element() rep : HTMLElement;
  
  
  async getData(){
    let response = await fetch("http://localhost:5000/webhook" , {
      method:"POST",
      body: JSON.stringify(this.msg)
    });
    console.log(response);
    console.log(JSON.stringify(this.msg));
    let json = await response.json();
    this.awnser = json.call;
  }

  async getColor(){
    let responseColor = await fetch("http://localhost:5000/admincolor1728");
    let json = await responseColor.json();
    this.color1 = {color : json.color};
    this.colorSVG = {fill : json.color};
    this.color2 = {background : json.color2};
    console.log(this.color1)
    console.log(this.color2)
    /*const linear = "linear-gradient(217deg , "+json.color+", "+json.color2+" 200.71%)";
    console.log(linear)*/
  }

  async getLogo(){
    let responseLogo = await fetch("http://localhost:5000/adminlogo1728");
    let json = await responseLogo.json();
    this.logoPath = './img/'+json.logo;
  }

  initRec = () => {
    const audio = new SpeechRecognition();
    this.msg=null;
    audio.onstart = () => {
      this.rec = true;
    };
    audio.onresult = event => {
      this.awnser=null;
      this.msg = event.results[event.resultIndex][0].transcript;
      this.rec = false;
      console.log(this.msg);
      this.getData();
    };
    audio.start();
    
  };
  handleClickOpenClose = () => {
    this.open = !this.open;
    this.init = '';
    this.msg = 'Une question ?';
    this.awnser=""
    this.rec = false;
    this.getColor();
    this.getLogo();
  };
  render() {
    if(this.color1 == null && this.colorSVG == null && this.color2 == null)
    {
      this.getColor();
      this.getLogo();
    }
    return (
      <Host>
        <div id={'container_' + this.open + this.init}>
        <div class={'exit_chat_' + this.open + this.init} style={this.color2}>
          <img class={'exit_cross_' + this.open + this.init} src={getAssetPath('./img/fermer.svg')} alt="zdzed" width="30" onClick={this.handleClickOpenClose} />
        </div>
        <div id={'backgroundrobot'} onClick={this.open ? null : this.handleClickOpenClose}style={this.color2}>
          <p class={'text__said_' + this.open + this.init +"_"+ this.rec} style={this.color1}>{this.msg}</p>
          <p class={'text__chat_' + this.open + this.init} style={this.color1}>{this.awnser}</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="waves" preserveAspectRatio="none" viewBox="10 14 80 38">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"></path>
            </defs>
            <g class="parallax">
            <use y="7" style={this.colorSVG}  opacity="0" class="waves-color" xlinkHref="#gentle-wave"></use>
            <use y="1" style={this.colorSVG}  class="waves-color" opacity="0.7" xlinkHref="#gentle-wave"></use>
              <use y="3" style={this.colorSVG}  class="waves-color" opacity="0.5" xlinkHref="#gentle-wave"></use>
              <use y="5" style={this.colorSVG}  class="waves-color" opacity="0.3" xlinkHref="#gentle-wave"></use>
              <use y="7" style={this.colorSVG}  opacity="1" class="waves-color" xlinkHref="#gentle-wave"></use>
              
            </g>
          </svg>
          <div class={'loader_' + this.rec + this.init}>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
          <svg
            class={'text__mike_' + this.open + this.init}
            onClick={this.initRec}
            enable-background="new 0 0 512 512"
            height="30"
            viewBox="0 0 512 512"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="m256 352c-46.869 0-85-38.131-85-85v-120c0-46.869 38.131-85 85-85s85 38.131 85 85v120c0 46.869-38.131 85-85 85z" />
              <g>
                <path d="m396 192h-25v30h10v45c0 68.925-56.075 125-125 125s-125-56.075-125-125v-45h10v-30h-25c-8.284 0-15 6.716-15 15v60c0 85.467 69.532 155 155 155s155-69.533 155-155v-60c0-8.284-6.716-15-15-15z" />
              </g>
              <path d="m308.5 482h-37.5v-30.61c-4.949.399-9.95.611-15 .611s-10.051-.212-15-.611v30.61h-37.5c-8.284 0-15 6.716-15 15s6.716 15 15 15h105c8.284 0 15-6.716 15-15s-6.716-15-15-15z" />
              <g>
                <g>
                  <circle cx="377" cy="99.853" r="15" />
                  <path d="m419.427 157.28c-3.839 0-7.678-1.464-10.606-4.393-5.858-5.858-5.858-15.355 0-21.213 17.545-17.545 17.545-46.095 0-63.64-5.858-5.858-5.858-15.355 0-21.213 5.858-5.857 15.356-5.857 21.213 0 29.241 29.243 29.241 76.823 0 106.066-2.929 2.928-6.768 4.393-10.607 4.393z" />
                  <path d="m461.853 199.706c-3.839 0-7.678-1.464-10.606-4.394-5.858-5.858-5.858-15.355 0-21.213 19.831-19.832 30.753-46.199 30.753-74.246 0-28.046-10.922-54.414-30.754-74.246-5.858-5.857-5.858-15.355 0-21.213 5.857-5.858 15.355-5.858 21.213 0 25.498 25.498 39.541 59.399 39.541 95.459s-14.043 69.961-39.541 95.459c-2.929 2.929-6.768 4.394-10.606 4.394z" />
                </g>
              </g>
              <g>
                <g>
                  <circle cx="135" cy="99.853" r="15" />
                  <path d="m92.573 157.28c-3.839 0-7.678-1.464-10.606-4.394-29.241-29.243-29.241-76.823 0-106.066 5.857-5.857 15.355-5.858 21.213 0s5.858 15.355 0 21.213c-17.545 17.545-17.545 46.095 0 63.64 5.858 5.858 5.858 15.355 0 21.213-2.929 2.929-6.769 4.394-10.607 4.394z" />
                  <path d="m50.148 199.706c-3.839 0-7.678-1.464-10.606-4.394-25.499-25.498-39.542-59.399-39.542-95.459s14.043-69.961 39.541-95.459c5.858-5.858 15.356-5.857 21.213 0 5.858 5.858 5.858 15.355 0 21.213-19.832 19.832-30.754 46.199-30.754 74.246s10.922 54.415 30.754 74.247c5.858 5.857 5.858 15.355 0 21.213-2.929 2.928-6.768 4.393-10.606 4.393z" />
                </g>
              </g>
            </g>
          </svg>
          <img src={getAssetPath(this.logoPath)} alt="" class={"robot_" + this.open + this.init} onClick={this.open ? this.initRec : null}/>
        </div>
        <script>const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;</script>
      </div>
      </Host>
    );
  }

}
