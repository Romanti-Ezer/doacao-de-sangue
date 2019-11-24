import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { MinhaContaPage } from '../minha-conta/minha-conta';

/**
* Generated class for the SignupPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {
	private signupError: string;
	private form: FormGroup;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth: AuthService, public firestone: FirestoreService,
		private alert: AlertController, public menuCtrl:MenuController) {
			// Creates a FormBuilder group for validation
			this.form = fb.group({
				email: ['', Validators.compose([Validators.required, Validators.email])],
				password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
			});
		}
		
		public ionViewDidLoad() {
			console.log('ionViewDidLoad SignupPage');
		}
		
		public signUp() {
			let alert = this.alert.create({
				title: "Cadastro realizado com sucesso!",
				subTitle: "Ainda é necessário preencher alguns dados. <br> Deseja preencher agora ou navegar pelo aplicativo?",
				buttons: [
					{
						text: 'Navegar',
						handler: () => {console.log('Quer Navegar')
						this.navCtrl.setRoot(HomePage);
					}
				},
				
				{
					text: 'Preencher',
					handler: () => {console.log('Quer preencher')
					this.navCtrl.setRoot(MinhaContaPage);
					this.menuCtrl.enable(true);
				}
			}
		]
		
		
	});
	// Prepares data for use Auth service for create user
	let data = this.form.value;
	let credentials = {
		email: data.email,
		password: data.password
	};
	
	// Uses Auth service to create user
	this.auth.signUp(credentials).then(
		// If returns response
		(response) => {
			// Uses Firestone service to create user with more detailed data
			this.firestone.setUser(response.user.uid,'', credentials.email);
			alert.present();
		},
		// If returns error
		error => {
			var errorCode = error.code;
			var errorMessage = "";
			if (errorCode === 'auth/email-already-in-use') {
				errorMessage = "O e-mail informado já está sendo utilizado.";
			} else if (errorCode === 'auth/invalid-email') {
				errorMessage = "O e-mail informado é inválido.";
			} else if (errorCode === 'auth/operation-not-allowed') {
				errorMessage = "A criação de contas por e-mail e senha está desabilitada. Contate o administrador para mais detalhes";
			} else if (errorCode === 'auth/weak-password') {
				errorMessage = "A senha informada é muito fraca. Tente acrescentar caracteres especiais, letras maiúsculas e minúsculas.";
			} else {
				errorMessage = "Ocorreu um erro na sua solicitação. Tente novamente mais tarde";
			}
			return this.signupError = errorMessage
		}
		);
	}
	
	public login(){
		this.navCtrl.setRoot(LoginPage);
	}
	
}