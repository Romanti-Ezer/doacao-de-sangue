import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { EsqueciMinhaSenhaPage } from '../esqueci-minha-senha/esqueci-minha-senha';
/**
* Generated class for the LoginPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    
    protected loginForm: FormGroup;
    protected loginError: string;
    
    constructor(
        protected navCtrl: NavController,
        protected auth: AuthService,
        protected fb: FormBuilder,
        public menuCtrl:MenuController
        ) {
            // Disables menu
            this.menuCtrl.enable(false)

            // Creates a FormBuilder group for validation
            this.loginForm = this.fb.group({
                email: ['', Validators.compose([Validators.required, Validators.email])],
                password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
            });

            console.log("current user: ", this.auth.getCurrentUser());
            if(this.auth.getCurrentUser()) {
                this.navCtrl.setRoot(HomePage)
            }
    }
        
    public login() {
        // Prepares data for use Auth service for login
        let data = this.loginForm.value;
        
        if (!data.email) {
            return;
        }
        
        let credentials = {
            email: data.email,
            password: data.password
        };

        // Uses Auth service to login
        this.auth.signInWithEmail(credentials)
        .then(
            () => {
                console.log("current user: ", this.auth.getCurrentUser());
                var lthis = this;
                this.auth.setPersistence()
                    .then(function() {
                        lthis.navCtrl.setRoot(HomePage)
                    })
            },
            error => this.loginError = error.message
        );
    }
        
    public signUp(){
        // Change screen to sign up
        this.navCtrl.setRoot(SignupPage);
    }

    public forgotPassword(){
        // Change screen to sign up
        this.navCtrl.setRoot(EsqueciMinhaSenhaPage);
    }
}