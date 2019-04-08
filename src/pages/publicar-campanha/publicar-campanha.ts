import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFirestore: AngularFirestore) {
    this.campanhasCollectionRef = this.angularFirestore.collection('campanhas'); 
    this.campanhas = this.campanhasCollectionRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicarCampanhaPage');
  }

  cadastro(){
    console.log("hello wooorld");
  }


   habilitar(){
    document.getElementById('divHidden').hidden=false
  }﻿﻿;

  desabilitar(){
    document.getElementById('divHidden').hidden = true;
  };
}





