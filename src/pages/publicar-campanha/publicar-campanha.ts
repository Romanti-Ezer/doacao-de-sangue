import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoneService } from '../../services/firestone.service';
import { Campanha } from '../../services/firestone.service';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
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
                nome: ['', Validators.compose([Validators.required, Validators.maxLength(15)])],
                cep: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],      
                endereco: ['', Validators.compose( [Validators.required])],
                numero: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])],
                cidade: ['', Validators.compose([Validators.required,])],
                uf: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
                obs: ['', Validators.compose([Validators.maxLength(200)])]
            })
            this.dados = this.firestone.getUserData();
            
        }
        
    ionViewDidLoad() {
        console.log('ionViewDidLoad PublicarCampanhaPage');
    }
    
    cadastro(){
        console.log("hello wooorld");
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
        // console.log(event.target);
        // console.log('this.userSangue: \'', this.userSangue + '\'');
        // this.firestone.updateUserData(  
        //   event.target.userDocId.value,
        //   event.target.userNome.value,
        //   event.target.userTel.value,
        //   event.target.userCEP.value,
        //   event.target.userEnd.value,
        //   event.target.userEndNum.value,
        //   event.target.userCidade.value,
        //   event.target.userUF.value,
        //   this.userSangue
        // );
      }
}