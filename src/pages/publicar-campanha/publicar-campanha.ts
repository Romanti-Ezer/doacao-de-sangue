import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoneService } from '../../services/firestone.service';
import { Campanha } from '../../services/firestone.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
* Generated class for the PublicarCampanhaPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-publicar-campanha',
    templateUrl: 'publicar-campanha.html',
})
export class PublicarCampanhaPage {
    
    // Validação do Formulário
    validaFormulario: FormGroup;
    
    // Dados do usuário
    dados:any;

    // Chaves - Mostrar ou não dados do divulgador
    mostrarNomeDivulgador : boolean = false;
    mostrarEmailDivulgador : boolean = false;
    mostrarTelDivulgador : boolean = false;
    mostrarEndDivulgador : boolean = false;

    // Data Limite
    dataLimite : Date = null;

    ionViewWillLeave() {
        this.appCtrl.getRootNav().setRoot(HomePage);
    }


    constructor(
        public appCtrl: App,
        public alertCtrl: AlertController, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public firestone: FirestoneService,
        public fb: FormBuilder,
        ) {
            this.validaFormulario = fb.group({
                tipoSangue: ['AB+'],
                tipoDoacao: ['sangue'],
                nome: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
                cep: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],      
                endereco: ['', Validators.compose( [Validators.required])],
                numero: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])],
                cidade: ['', Validators.compose([Validators.required,])],
                uf: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
                obs: ['', Validators.compose([Validators.maxLength(200)])],
                divulgadorPaciente: [''],

            })

            this.dados = this.firestone.getUserData();
            
        }
    

    ionViewDidLoad() {
        console.log('ionViewDidLoad PublicarCampanhaPage');
    }
    
    
    rHabilitar(){ //se nao for o paciente
        document.getElementById('divHidden').hidden=false;
    };
    
    rDesabilitar(){ //se for o paciente
        document.getElementById('divHidden').hidden = true;
        document.getElementById('nomePacienteIndicado').hidden=true;
    };
    
    iHabilitar(){ //input habilitar nome do paciente indicado
        document.getElementById('nomePacienteIndicado').hidden=false;
    };
    
    iDesabilitar(){ //input desabilitar nome do paciente indicado
        document.getElementById('nomePacienteIndicado').hidden = true;
        this.showAlert("Publicação Anonima", "Essa opção é indicada para publicações anonimas");
    };
    
    showAlert(titulo, subtitulo) { // coloquei os 2 parametros para reaproveitar esse alert caso precise
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: subtitulo,
            buttons: ['OK']
        });
        alert.present();
    }

    public publicarCampanha(event) {
        let nomeDivulgador = this.mostrarNomeDivulgador ? event.target.nomeDivulgador.value ? event.target.nomeDivulgador.value : '' : '';
        let emailDivulgador = this.mostrarEmailDivulgador ? event.target.emailDivulgador.value ? event.target.emailDivulgador.value : '' : '';
        let telDivulgador = this.mostrarTelDivulgador ? event.target.telDivulgador.value ? event.target.telDivulgador.value : '' : '';
        let endDivulgadorCEP = this.mostrarEndDivulgador ? event.target.endDivulgadorCEP.value ? event.target.endDivulgadorCEP.value : '' : '';
        let endDivulgador = this.mostrarEndDivulgador ? event.target.endDivulgador.value ? event.target.endDivulgador.value : '' : '';
        let endDivulgadorNum = this.mostrarEndDivulgador ? event.target.endDivulgadorNum.value ? event.target.endDivulgadorNum.value : '' : '';
        let endDivulgadorCidade = this.mostrarEndDivulgador ? event.target.endDivulgadorCidade.value ? event.target.endDivulgadorCidade.value : '' : '';
        let endDivulgadorUF = this.mostrarEndDivulgador ? event.target.endDivulgadorUF.value ? event.target.endDivulgadorUF.value : '' : '';

        if(this.firestone.setCampanha(
            this.validaFormulario.value.tipoSangue,
            this.validaFormulario.value.tipoDoacao,
            this.dataLimite,
            event.target.nomeHemocentro.value,
            event.target.endHemocentroCEP.value,
            event.target.endHemocentro.value,
            event.target.endHemocentroNro.value,
            event.target.endHemocentroCidade.value,
            event.target.endHemocentroUF.value,
            nomeDivulgador,
            emailDivulgador,
            telDivulgador,
            endDivulgadorCEP,
            endDivulgador,
            endDivulgadorNum,
            endDivulgadorCidade,
            endDivulgadorUF,
            this.validaFormulario.value.divulgadorPaciente,
            event.target.pacienteIndicado.value,
            event.target.observacoes.value
        )) {
            // Se der certo
            this.showAlert("Sucesso", "Campanha publicada com sucesso!");
            event.target.reset();
        } else {
            // Se não der certo
            this.showAlert("Erro", "Erro ao publicar campanha :/");
        }
    }
}