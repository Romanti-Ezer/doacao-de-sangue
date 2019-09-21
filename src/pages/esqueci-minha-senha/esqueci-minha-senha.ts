import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { UtilsService } from '../../services/utils.service';

/**
* Generated class for the EsqueciMinhaSenhaPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-esqueci-minha-senha',
    templateUrl: 'esqueci-minha-senha.html',
})
export class EsqueciMinhaSenhaPage {
    
    protected resetForm: FormGroup;
    protected resetError: string;
    
    constructor(
        protected navCtrl: NavController,
        protected auth: AuthService,
        protected fb: FormBuilder,
        public menuCtrl:MenuController,
        public utils: UtilsService
        ) {
            // Disables menu
            this.menuCtrl.enable(false)

            // Creates a FormBuilder group for validation
            this.resetForm = this.fb.group({
                email: ['', Validators.compose([Validators.required, Validators.email])]
            });
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad EsqueciMinhaSenhaPage');
    }
    
    public resetPassword() {
        // Prepares data for use Auth service for login
        let data = this.resetForm.value;
        
        if (!data.email) {
            return;
        }

        // Uses Auth service to login
        this.auth.resetPassword(data.email)
        .then(
            () => {
                this.utils.showAlert("Enviado com sucesso", "Foi enviado um link para redefinição de senha em seu e-mail.");
                this.navCtrl.setRoot(LoginPage);
            },
            error => this.resetError = error.message
        );
    }
    public login(){
        this.navCtrl.setRoot(LoginPage);
    }
    public signUp(){
        this.navCtrl.setRoot(SignupPage);
    }
}
