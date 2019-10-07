import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, Platform} from 'ionic-angular';
import { Message } from './models/message';
import { ApiAiClient } from 'api-ai-javascript';
import { FormControl, FormBuilder } from '@angular/forms';
import { credentials } from '../../app/config';

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
    protected accessToken: string = credentials.dialogflow.accessToken;
    protected client;
    protected messages: Message[] = [];
    protected messageForm: any;
    protected chatBox: any;
    protected isLoading: boolean;
    
    constructor(public platform: Platform, public formBuilder: FormBuilder) {
        this.chatBox = '';
        
        this.messageForm = formBuilder.group({
            message: new FormControl('')
        });
        
        this.client = new ApiAiClient({
            accessToken: this.accessToken
        });
    }
    
    public sendMessage(req: string) {
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
            
            //mais uma gambiarra para trocar todo - por <br>
            //var textResponse = response.result.fulfillment.speech;
            //textResponse = textResponse.replace(/-/g, '<br><br>');
            
            //console.log(textResponse);
            
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
    
    public scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 100);
    }
    
    onload =  this.funcaodoguil(); // quando pagina carregar faz a funcao
    
    public funcaodoguil() // gambiarra feito por Guilbert kkk
    {
        this.isLoading = true;
        setTimeout(() => {
            this.messages.push({
                from: 'Sanguinho',
                text: 'Bem vindo sou o Sanguinho caso tenha alguma duvida você pode retirá-las aqui é facil apenas escreva no campo abaixo, sinta-se à vontade para perguntar :). '
            });
            this.isLoading = false;

        
            setTimeout(() => {
                this.isLoading = true;
                setTimeout(() => {
                    this.messages.push({
                        from: 'Sanguinho',
                        text: 'Utilizamos a Portaria 158/ 04 de fevereiro 2016 como amparo de nossas respostas.'
                    })
                    this.isLoading = false;
                }, 1500);
            }, 500);
        }, 1200)
    }

}


