import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the MinhaContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// atualizarCadastroForm: FormGroup;

@IonicPage()
@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html',
})
export class MinhaContaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhaContaPage');
  }

  public atualizarCadastro() {
    console.log("Implementar a atualização aqui");
  }

}
