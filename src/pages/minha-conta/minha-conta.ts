import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirestoneService } from '../../services/firestone.service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

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
    
    protected userBlood: string;
    protected userGender: string;
    protected users: any;
    protected contaForm: FormGroup;
    
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FormBuilder,
        public alertCtrl: AlertController,
        protected firestone: FirestoneService) {
            
            // Get logged user data
            this.users = this.firestone.getUser()
    }
        
    ionViewDidLoad() {
        console.log('ionViewDidLoad MinhaContaPage');
    }
    
    // Stores user blood type
    public setBlood(value) {
        this.userBlood = value;
    }

    // Store user gender
    public setGender(value) {
        this.userGender = value;
    }

    public showAlert(title, subtitle) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }
    Blood
    // Uses firestone service to update user and shows a message
    public updateUser(event) {
        // Uses Firestone service for update logged user data
        if(this.firestone.updateUser(  
            event.target.userDocId.value,
            event.target.userName.value,
            event.target.userPhone.value,
            event.target.userCEP.value,
            event.target.userAddress.value,
            event.target.userAddressNum.value,
            event.target.userCity.value,
            event.target.userState.value,
            this.userBlood,
            this.userGender
        )) {
            // If user data is updated successfully
            this.showAlert("Sucesso", "Dados atualizados com sucesso!");
            this.navCtrl.setRoot(HomePage);
        } else {
            // If an error occurs
            this.showAlert("Erro", "Erro ao atualizar dados :/");
        }
    }
}