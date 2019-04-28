import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

import { AuthService } from '../../services/auth.service';
import { FirestoneService } from '../../services/firestone.service';
import { LoginPage } from '../login/login';
import { from } from 'rxjs';

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
  signupError: string;
	form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth: AuthService, public firestone: FirestoneService) {
    this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  public signup() {
		let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};
		this.auth.signUp(credentials).then(
			(response) => {
        this.navCtrl.setRoot(HomePage);
        this.firestone.setUser(response.user.uid,'', credentials.email);
      },
			error => this.signupError = error.message
    );
  }

  public login(){
    this.navCtrl.setRoot(LoginPage);
  }

}
