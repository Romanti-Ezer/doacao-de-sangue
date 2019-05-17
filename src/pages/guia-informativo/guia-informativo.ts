import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, Platform} from 'ionic-angular';
import { Message } from './models/message';
import { ApiAiClient } from 'api-ai-javascript';
import { FormControl, FormBuilder } from '@angular/forms';

/**
 * Generated class for the GuiaInformativoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guia-informativo',
  templateUrl: 'guia-informativo.html',
})
export class GuiaInformativoPage {

  @ViewChild(Content) content: Content;
  accessToken: string = '18eff182e4034006a9796ff28f34f6f4';
  client;
  messages: Message[] = [];
  messageForm: any;
  chatBox: any;
  isLoading: boolean;
  
  constructor(public platform: Platform, public formBuilder: FormBuilder) {
    this.chatBox = '';

    this.messageForm = formBuilder.group({
      message: new FormControl('')
    });

    this.client = new ApiAiClient({
      accessToken: this.accessToken
    });
  }

  sendMessage(req: string) {
    if (!req || req === '') {
      return;
    }
    this.messages.push({ from: 'Eu', text: req });
    this.isLoading = true;

    this.client
      .textRequest(req)
      .then(response => {
        /* do something */
        console.log('res');
        console.log(response);
        this.messages.push({
          from: 'Sanguinho',
          text: response.result.fulfillment.speech
        });
        this.scrollToBottom();
        this.isLoading = false;
      })
      .catch(error => {
        /* do something here too */
        console.log('error');
        console.log(error);
      });

    this.chatBox = '';
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

 

  onload =  this.funcaodoguil(); // quando pagina carregar faz a gambiarra

funcaodoguil() // gambiarra feito por Guilbert kkk
{
  
  this.messages.push({
    from: 'Sanguinho',
    text: 'Bem vindo sou o Sanguinho caso tenha alguma duvida você pode retirá-las aqui é facil apenas escreva no campo abaixo, sinta-se à vontade para perguntar :). '
  })

  this.messages.push({
    from: 'Sanguinho',
    text: 'Utilzamos a Portaria 158/ 04 de fevereiro 2016 como amparo de nossas respostas.'
  })
}

  
}


