class Calculatrice{
  constructor(){
    this.squareRoot = document.querySelector('button');
    this.squareRootImg = document.querySelector('button img');
    this.allButton = document.querySelectorAll('button');
    this.buttonTxt = document.querySelectorAll('button span');
    this.result = document.getElementById('result');
    this.memoryResult = document.getElementById('memorie');
    this.equal = document.getElementById('equal');

    this.optionAdd = document.getElementById('add');
    this.optionDivi = document.getElementById('divi');
    this.optionMulti = document.getElementById('multi');
    this.optionSous = document.getElementById('sous');
    this.optionM = document.getElementById('m');
    this.optionMr = document.getElementById('mr');
    this.optionMc = document.getElementById('mc');

    this.comma = false;
    this.maxNb = false;
    this.memo = null;
    this.memoryState = false;
    this.eeState = false;
    this.eeVal1;
    this.xState = false;
    this.rootState = false;
    this.lastWordMemory;
    this.lastWordResult;
    this.equalState = false;

  }      

  init(){
    this.effetAllKey();
    this.newInput();
    this.displayKey();
    this.equalResult();
    this.displayOption();
    this.resultLimit();
    this.memory();
    this.resetC();
    this.resetCE();
  }

  effetAllKey(){
    this.squareRoot.addEventListener('pointerdown', () => {
      this.squareRootImg.style.width = '21px';
    });
    this.squareRoot.addEventListener('pointerup', () => {
      this.squareRootImg.style.width = '23px';
    });

    this.allButton.forEach(function(elem, index){
      if(index > 0 && index <= 22){
        elem.addEventListener('pointerdown', () => {
          this.buttonTxt[index - 1].style.fontSize = '26px';
        });
        elem.addEventListener('pointerup', () => {
          this.buttonTxt[index - 1].style.fontSize = '28px';
        });
      }else if(index == 23){
        elem.addEventListener('pointerdown', () => {
          elem.style.fontSize = '68px';
        });
        elem.addEventListener('pointerup', () => {
          elem.style.fontSize = '70px';
        });
      }
    }, this);
  }

  newInput(){
    this.allButton.forEach(function(elem){
      elem.addEventListener('pointerdown', () => {

        let regexEE = /\b0$\b/.test(this.result.innerHTML);

        if(this.result.innerHTML === '0' && elem.innerText !== 'M+' && elem.innerText !== 'MR' && 
        elem.innerText !== 'MC' && elem.innerText !== 'x²' && elem.innerText !== 'EE' && elem.innerText !== '+' && 
        elem.innerText !== '-' && elem.innerText !== 'X'  && elem.innerText !== '/' && elem.innerText !== '='){
          this.result.innerHTML = '';
        }else if(this.eeState === true && regexEE === true && elem.innerText !== '.' && elem.innerText !== 'EE'){
          this.result.innerHTML = this.result.innerHTML.replace(/.$/, '');
        }

      });
    },this);
  }

  displayKey(){

    this.allButton.forEach(function(elem){
      elem.addEventListener('pointerdown', () => {

        this.lastWordMemory = this.memoryResult.innerHTML.slice(-1);
        this.lastWordResult = this.result.innerHTML.slice(-1);
        
        if(this.maxNb === false && this.equalState === false && this.rootState === false && this.xState === false){
          switch(elem.innerText){
            case '.':
              if(this.result.innerHTML === ''){
                this.result.innerHTML = '0';
              }

              if(this.comma === false && this.eeState === false){
                this.result.innerHTML += '.';
                this.comma = true;
              }
              break;

            case '0':
              if(this.result.innerHTML !== '0'){
                this.result.innerHTML += '0';
              }
              break;

            case '1':
              this.result.innerHTML += '1';
              break;

            case '2':
              this.result.innerHTML += '2';
              break;

            case '3':
              this.result.innerHTML += '3';
              break;

            case '4':
              this.result.innerHTML += '4';
              break;

            case '5':
              this.result.innerHTML += '5';
              break;

            case '6':
              this.result.innerHTML += '6';
              break;

            case '7':
              this.result.innerHTML += '7';
              break;

            case '8':
              this.result.innerHTML += '8';
              break;

            case '9':
              this.result.innerHTML += '9';
              break;

            case 'EE':
              if(this.lastWordResult === '.' && this.eeState === false){
                this.result.innerHTML = `${this.result.innerHTML.replace(/.$/, '')}`;
              }
            
              if(this.result.innerHTML !== '0' && this.eeState === false){
                this.eeVal1 = this.result.innerHTML;
                this.result.innerHTML = `${this.eeVal1}e + 0`;
                this.eeState = true;
                this.comma = false;
              }else if(this.result.innerHTML === '0' && this.eeState === false){
                this.comma = false;
              }

              if(this.result.innerHTML !== '0'){
                this.optionAdd.style.backgroundColor = '#0000003b';
                this.optionSous.style.backgroundColor = '#0000003b';
                this.optionDivi.style.backgroundColor = '#0000003b';
                this.optionMulti.style.backgroundColor = '#0000003b';
              }
              break;

            case 'x²':
              if(this.memoryResult.innerHTML === '' && this.result.innerHTML !== '' && this.lastWordResult !== '.'){
                this.memoryResult.innerHTML += `sqr(${this.result.innerHTML})`;
                this.result.innerHTML = this.result.innerHTML * this.result.innerHTML;
                this.xState = true;
              }else if(this.memoryResult.innerHTML === '' && this.result.innerHTML === ''){
                this.memoryResult.innerHTML += `sqr(0)`;
                this.xState = true;
              }else if(this.memoryResult.innerHTML === '' && this.result.innerHTML !== '' && this.lastWordResult === '.'){
                this.memoryResult.innerHTML += `sqr(${this.result.innerHTML.replace(/.$/, '')})`;
                this.result.innerHTML = this.result.innerHTML * this.result.innerHTML;
                this.xState = true;
              }
              break;

            case '':
              if(this.memoryResult.innerHTML === '' && this.result.innerHTML !== '' && this.lastWordResult !== '.'){
                this.memoryResult.innerHTML += `√(${this.result.innerHTML})`;
                this.result.innerHTML = Math.sqrt(this.result.innerHTML);
                this.rootState = true;
              }else if(this.memoryResult.innerHTML === '' && this.result.innerHTML === ''){
                this.memoryResult.innerHTML += `√(0)`;
                this.result.innerHTML = '0';
                this.rootState = true;
              }else if(this.memoryResult.innerHTML === '' && this.result.innerHTML !== '' && this.lastWordResult === '.'){
                this.memoryResult.innerHTML = `√(${this.result.innerHTML.replace(/.$/, '')})`;
                this.result.innerHTML = Math.sqrt(this.result.innerHTML);
                this.rootState = true;
              }
              break;
          }
        }

        if(this.equalState === false && this.rootState === false && this.xState === false){
          switch(elem.innerText){
            case '+':
              if(this.result.innerHTML !== '0' && this.lastWordResult !== '.' && this.lastWordMemory !== ')' && this.eeState !== true){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} +`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.result.innerHTML === '0' && this.memoryResult.innerHTML === ''){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} +`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if((this.lastWordMemory === '+' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '-' && this.lastWordResult !== '.' && this.eeState !== true) || 
              (this.lastWordMemory === '*' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '/' && this.lastWordResult !== '.' && this.eeState !== true)){
                this.memoryResult.innerHTML = this.memoryResult.innerHTML.replace(/.$/, '+');
              }

              if(this.lastWordResult === '.' && this.eeState === false && this.xState === false && this.rootState === false){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML.replace(/.$/, ' ')}`;
                this.memoryResult.innerHTML += '+';
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.lastWordResult === ' ' && this.eeState === true){
                this.result.innerHTML = this.result.innerHTML.replace(/.$/, ' 0');
              }
              break;

            case '-':
              if(this.result.innerHTML !== '0' && this.lastWordResult !== '.' && this.lastWordMemory !== ')' && this.eeState !== true){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} -`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.result.innerHTML === '0' && this.memoryResult.innerHTML === ''){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} -`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if((this.lastWordMemory === '+' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '-' && this.lastWordResult !== '.' && this.eeState !== true) || 
              (this.lastWordMemory === '*' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '/' && this.lastWordResult !== '.' && this.eeState !== true)){
                this.memoryResult.innerHTML = this.memoryResult.innerHTML.replace(/.$/, '-');
              }

              if(this.lastWordResult === '.' && this.eeState === false && this.xState === false && this.rootState === false){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML.replace(/.$/, ' ')}`;
                this.memoryResult.innerHTML += '-';
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.lastWordResult === ' ' && this.eeState === true){
                this.result.innerHTML = this.result.innerHTML.replace(/.$/, ' 0');
              }
              break;

            case 'X':
              if(this.result.innerHTML !== '0' && this.lastWordResult !== '.' && this.lastWordMemory !== ')' && this.eeState !== true){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} *`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.result.innerHTML === '0' && this.memoryResult.innerHTML === ''){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} *`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if((this.lastWordMemory === '+' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '-' && this.lastWordResult !== '.' && this.eeState !== true) || 
              (this.lastWordMemory === '*' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '/' && this.lastWordResult !== '.' && this.eeState !== true)){
                this.memoryResult.innerHTML = this.memoryResult.innerHTML.replace(/.$/, '*');
              }

              if(this.lastWordResult === '.' && this.eeState === false && this.xState === false && this.rootState === false){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML.replace(/.$/, ' ')}`;
                this.memoryResult.innerHTML += '*';
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.lastWordResult === ' ' && this.eeState === true){
                this.result.innerHTML = this.result.innerHTML.replace(/.$/, ' 0');
              }
              break;

            case '/':
              if(this.result.innerHTML !== '0' && this.lastWordResult !== '.' && this.lastWordMemory !== ')' && this.eeState !== true){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} /`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.result.innerHTML === '0' && this.memoryResult.innerHTML === ''){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML} /`;
                this.result.innerHTML = '0';
                this.comma = false;
              }else if((this.lastWordMemory === '+' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '-' && this.lastWordResult !== '.' && this.eeState !== true) || 
              (this.lastWordMemory === '*' && this.lastWordResult !== '.' && this.eeState !== true) || (this.lastWordMemory === '/' && this.lastWordResult !== '.' && this.eeState !== true)){
                this.memoryResult.innerHTML = this.memoryResult.innerHTML.replace(/.$/, '/');
              }

              if(this.lastWordResult === '.' && this.eeState === false && this.xState === false && this.rootState === false){
                this.memoryResult.innerHTML += ` ${this.result.innerHTML.replace(/.$/, ' ')}`;
                this.memoryResult.innerHTML += '/';
                this.result.innerHTML = '0';
                this.comma = false;
              }else if(this.lastWordResult === ' ' && this.eeState === true){
                this.result.innerHTML = this.result.innerHTML.replace(/.$/, ' 0');
              }
              break;
          }
        }

      });
    }, this);
    
  }

  equalResult(){
    this.equal.addEventListener('pointerdown', () => {

      if(this.lastWordResult === '.'){
        this.result.innerHTML = this.result.innerHTML.replace(/.$/, '');
      }

      if(this.equalState === false && this.rootState === false && this.xState === false && this.eeState === false){
        this.memoryResult.innerHTML += ` ${this.result.innerHTML}`;
        this.result.innerHTML = eval(this.memoryResult.innerHTML);
        this.equalState = true;
      }else if(this.eeState === true && this.equalState === false){
        this.memoryResult.innerHTML = this.result.innerHTML;
        this.result.innerHTML = this.eeVal1 * Math.pow(10,this.result.innerHTML.split(' ')[2]);
        this.equalState = true;
        
        if(this.memoryResult.innerHTML.split(' ')[2] === ''){
          this.memoryResult.innerHTML += '0';
        }
      }
    });
  }
  

  displayOption(){
    this.allButton.forEach(function(elem){
      elem.addEventListener('pointerdown', () => {
        switch(elem.innerText){
          case '+':
            if(this.eeState !== true && this.lastWordMemory !== ')' && this.equalState !== true){
              this.optionAdd.style.backgroundColor = '#000000';
              this.optionSous.style.backgroundColor = '#0000003b';
              this.optionDivi.style.backgroundColor = '#0000003b';
              this.optionMulti.style.backgroundColor = '#0000003b';
            }
            break;
          case '-':
            if(this.eeState !== true && this.lastWordMemory !== ')' && this.equalState !== true){
              this.optionAdd.style.backgroundColor = '#0000003b';
              this.optionSous.style.backgroundColor = '#000000';
              this.optionDivi.style.backgroundColor = '#0000003b';
              this.optionMulti.style.backgroundColor = '#0000003b';
            }
            break;
          case 'X':
            if(this.eeState !== true && this.lastWordMemory !== ')' && this.equalState !== true){
              this.optionAdd.style.backgroundColor = '#0000003b';
              this.optionSous.style.backgroundColor = '#0000003b';
              this.optionDivi.style.backgroundColor = '#0000003b';
              this.optionMulti.style.backgroundColor = '#000000';
            }
            break;
          case '/':
            if(this.eeState !== true && this.lastWordMemory !== ')' && this.equalState !== true){
              this.optionAdd.style.backgroundColor = '#0000003b';
              this.optionSous.style.backgroundColor = '#0000003b';
              this.optionDivi.style.backgroundColor = '#000000';
              this.optionMulti.style.backgroundColor = '#0000003b';
            }
            break;
          case 'M+':
            if(this.eeState !== true){
              this.optionMr.style.color = '#000000';
              this.optionMc.style.color = '#000000';
            }
            break;
          case 'MC':
            this.optionMr.style.color = '#0000003b';
            this.optionMc.style.color = '#0000003b';
          break;
          case 'MR':
            this.resultLimit();
          break;
        }
      });  
    },this);
  }

  resultLimit(){
    this.allButton.forEach(function(elem){
      elem.addEventListener('pointerdown', () => {
        if(this.result.innerHTML.length <= 15){
          this.maxNb = false;
        }else if(this.result.innerHTML.length === 16){
          this.maxNb = true;
        }else if(this.result.innerHTML.length > 16){
          this.result.style.fontSize = '35px';
          this.maxNb = true;
        }
      });
    },this);
  }

  memory(){
    this.allButton.forEach(function(elem){
      elem.addEventListener('pointerdown', () => {
        switch(elem.innerText){
          case 'M+':
            if(this.lastWordResult !== '.' && this.eeState !== true){
              this.memo = this.result.innerHTML;
              this.memoryState = true;
            }else if(this.lastWordResult === '.'){
              this.memo = this.result.innerHTML.replace(/.$/, '');
              this.memoryState = true;
            }
            break;
          case 'MC':
            this.memoryState = false;
            this.optionMr.style.color = '#0000003b';
            this.optionMc.style.color = '#0000003b';
            break;
          case 'MR':
          if(this.memoryState === true){
            this.result.innerHTML = this.memo;
          }
          break;
        }
      });
    },this);
  }

  resetC(){
    const buttonC = document.getElementById("c");

    buttonC.addEventListener('pointerdown', () => {
      this.result.innerHTML = 0;
      this.result.style.fontSize = '47px';
      this.comma = false;
      this.eeState = false;
      this.equalState = false;
      this.rootState = false;
      this.xState = false;
      this.optionAdd.style.backgroundColor = '#0000003b';
      this.optionSous.style.backgroundColor = '#0000003b';
      this.optionDivi.style.backgroundColor = '#0000003b';
      this.optionMulti.style.backgroundColor = '#0000003b';
      this.memoryResult.innerHTML = null;
    });
  }

  resetCE(){
    const buttonCE = document.getElementById('ce');
    
    buttonCE.addEventListener('pointerdown', () => {
      this.result.innerHTML = '0';
      this.comma = false;
      this.eeState = false;
      this.result.style.fontSize = '47px';
    });
  }


}

let calc = new Calculatrice();

calc.init();

