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
    protected messages: Message[] = [];
    protected messageForm: any;
    protected chatBox: any;
    protected loading: boolean;
    protected user;
    
    constructor(public platform: Platform, public formBuilder: FormBuilder) {
        this.chatBox = '';
        
        this.messageForm = formBuilder.group({
            message: new FormControl('')
        });
        
        this.user = new ApiAiClient({
            accessToken: this.accessToken
        });
    }
    
    public sendMessage(req: string) {
        if (!req || req === '') {
            return;
        }
        this.messages.push({ from: 'Eu', text: req });
        this.loading = true;
        
        this.user
        .textRequest(req)
        .then(response => {
           
            
            
            
            
            this.messages.push({
                from: 'Sanguinho',
                text: response.result.fulfillment.speech
            });
            this.scrollToBottom();
            this.loading = false;
        })
        .catch(error => {
            console.log('Erro foi diagnosticado');
        });
        
        this.chatBox = '';
    }
    
    public scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 100);
    }
    
    onload =  this.funcaodoguil(); // quando pagina carregar faz a funcao
    
    public funcaodoguil() 
    {
        this.loading = true;
        setTimeout(() => {
            this.messages.push({
                from: 'Sanguinho',
                text: 'Bem-vindo sou o Sanguinho caso tenha alguma dúvida você pode retirá-las aqui é fácil apenas escreva no campo abaixo, sinta-se à vontade para perguntar. :). '
            });
            this.loading = false;

        
            setTimeout(() => {
                this.loading = true;
                setTimeout(() => {
                    this.messages.push({
                        from: 'Sanguinho',
                        text: 'Utilizamos a Portaria 158/04 de Fevereiro 2016 como amparo de nossas respostas.'
                    })
                    this.loading = false;
                }, 1500);
            }, 500);
        }, 1200)
    }

}


