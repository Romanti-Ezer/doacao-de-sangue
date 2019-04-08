import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FirestoneService } from '../../services/firestone.service';

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
  providers: [ FirestoneService ]
})
export class MinhaContaPage {

  userSangue: string;
  dados: any;
  contaForm: FormGroup;

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

  public setSangue(value) {
    this.userSangue = value;
  }

  public atualizarCadastro(event) {
    console.log(event.target);
    console.log('this.userSangue: \'', this.userSangue + '\'');
    this.firestone.updateUserData(  
      event.target.userDocId.value,
      event.target.userNome.value,
      event.target.userTel.value,
      event.target.userCEP.value,
      event.target.userEnd.value,
      event.target.userEndNum.value,
      event.target.userCidade.value,
      event.target.userUF.value,
      this.userSangue
    );
  }
}
