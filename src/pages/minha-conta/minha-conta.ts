import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirestoneService } from '../../services/firestone.service';
import { User } from '../../services/firestone.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
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

  dados: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              private auth: AuthService,
              private firestone: FirestoneService) {

    // Pegando os dados para já mostrar no formulário
    this.dados = this.firestone.getUserData()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhaContaPage');
  }

  public atualizarCadastro() {
    // this.firestone.updateUserData(this.contaData);
  }
}
