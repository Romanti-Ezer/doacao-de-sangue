import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoneService, User } from '../../services/firestone.service';
import { UtilsService } from '../../services/utils.service';
import { ISubscription } from "rxjs/Subscription";
/**
* Generated class for the CadastrarDoacaoPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-cadastrar-doacao',
    templateUrl: 'cadastrar-doacao.html',
})
export class CadastrarDoacaoPage implements OnDestroy {
    protected userData : any;
    protected registerForm : FormGroup;
    private subscription: ISubscription;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public firestone: FirestoneService, public utils: UtilsService) {
        this.registerForm = fb.group({
            donatType: [['sangue', 'plaquetas'], Validators.required],
            donatDate: [ '', Validators.required ],
            donatBloodCenter: ['', Validators.compose([Validators.required, Validators.maxLength(60)])]
        });
        this.subscription = this.firestone.getUser().subscribe((user:User[]) => {
            this.userData = user;
        });
        
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad CadastrarDoacaoPage');
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    public setDonation(event) {
        if (this.firestone.setDonation(this.userData[0].userID, this.registerForm.value.donatBloodCenter, this.registerForm.value.donatDate, this.registerForm.value.donatType)) {
            // If campaign is created successfully
            this.utils.showAlert("Sucesso", "Doação cadastrada com sucesso!");
            event.target.reset();
            this.navCtrl.pop();
        } else {
            // If an error occurs
            this.utils.showAlert("Erro", "Erro ao cadastrar doação :/");
        }
    }
}
