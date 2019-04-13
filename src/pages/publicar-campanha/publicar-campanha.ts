import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';


interface Campanha {
  dataLimite: Date,
  divulgadorPrecisa: boolean,
  emailDivulgador: string,
  emailHemocentro: string,
  endDivulgador: string,
  endDivulgadorCEP: string,
  endHemocentro: string,
  endHemocentroCEP: string,
  grauUrgencia: string,
  infAdicionais: string,
  nomeDivulgador: string,
  nomeHemocentro: string,
  nomePaciente: string,
  outroContatoHemocentro: string,
  pagFacebookHemocentro: string,
  possuiWhatsapp: boolean,
  possuiWhatsapp2: boolean,
  siteHemocentro: string,
  telDivulgador: string,
  telDivulgador2: string,
  telHemocentro: string,
  telHemocentro2: string,
  tipoDoacao: string,
  tipoSangue: string
}

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

  // Dizendo que campanhas é um Observable da Interface Campanha
  campanhas: Observable<Campanha[]>;
  // campanhasCollectionRef é uma collection de Campanhas -> Coleção de campanhas
  campanhasCollectionRef: AngularFirestoreCollection<Campanha>;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public angularFirestore: AngularFirestore) {
    this.campanhasCollectionRef = this.angularFirestore.collection('campanhas'); 
    this.campanhas = this.campanhasCollectionRef.valueChanges();
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
}






