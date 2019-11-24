import { Component, OnDestroy  } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreService, User } from '../../services/firestore.service';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CepService } from '../../services/cep.service';

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
    providers: [ FirestoreService ]
})
export class MinhaContaPage implements OnDestroy {
    
    protected userBlood: string = '';
    protected userGender: string = '';
    protected users: any;
    protected userData: User;

    private subscription: ISubscription;

    constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public cepService: CepService,
    protected firestone: FirestoreService)
    {
        
        // Get logged user data
        this.users = this.firestone.getUser()

        this.subscription = this.firestone.getUserr().subscribe(function(value) {
            this.userData = value[0]
            this.userGender = this.userData.userGender;
            this.userBlood = this.userData.userBlood;
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MinhaContaPage');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    // Stores user blood type
    public setBlood(value) {
        this.userBlood = value;
    }

    // Store user gender
    public setGender(value) {
        this.userGender = value;
    }
    public setInitialGender(value) {
        if (!this.userGender)
            this.userGender = value;
    }

    public setInitialUserBlood(value) {
        if (!this.userBlood) {
            this.userBlood = value;
        }
    }

    /* Todo */
    // Use data received from ViaCEP
    public getAddress(event){
        let cep = event.value
        if (cep.length < 8)
        return false;
        let lthis = this;
        this.cepService.getAddress(cep)
        .subscribe(data => {
            console.log(data)
            // this.address = data.logradouro;
            // this.city = data.localidade;
            // this.state = lthis.uf = data.uf;
        })
    }

    public showAlert(title, subtitle) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }
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
