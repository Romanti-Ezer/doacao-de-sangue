import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';

import { AuthService } from '../../services/auth.service';
import { FirestoneService } from '../../services/firestone.service';
import { LoginPage } from '../login/login';

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
    
    constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private auth: AuthService, public firestone: FirestoneService) {
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
                // Set homepage as root screen
                this.navCtrl.setRoot(HomePage);
                // Uses Firestone service to create user with more detailed data
                this.firestone.setUser(response.user.uid,'', credentials.email);
            },
            // If returns error
            error => this.signupError = error.message
        );
    }

    public login(){
        this.navCtrl.setRoot(LoginPage);
    }

}