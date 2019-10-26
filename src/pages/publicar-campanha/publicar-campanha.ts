import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoneService } from '../../services/firestone.service';
import { UtilsService } from '../../services/utils.service';
import { HomePage } from '../home/home';

/**
* Generated class for the PublicarCampanhaPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-publicar-campanha',
    templateUrl: 'publicar-campanha.html',
})
export class PublicarCampanhaPage {
    
    protected validaFormulario: FormGroup;
    
    // User data
    public userData:any;

    // Keys - show or don't data about promoter
    protected mostrarcampPromoterName : boolean = false;
    protected mostrarcampPromoterEmail : boolean = false;
    protected mostrarcampPromoterPhone : boolean = false;
    protected mostrarcampPromoterAddress : boolean = false;

    // Limit date
    protected campLimitDate : Date = null;

    public ionViewWillLeave() {
        this.appCtrl.getRootNav().setRoot(HomePage);
    }


    constructor(
        public appCtrl: App,
        public utils: UtilsService, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public firestone: FirestoneService,
        public fb: FormBuilder,
        ) {
            this.validaFormulario = fb.group({
                campBloodType: [''],
                campDonateType: ['sangue'],
                nome: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
                cep: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],      
                endereco: ['', Validators.compose( [Validators.required])],
                numero: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])],
                cidade: ['', Validators.compose([Validators.required,])],
                uf: ['', Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(2)])],
                obs: ['', Validators.compose([Validators.maxLength(200)])],
                campPromoterIsPatient: [''],

            })

            this.userData = this.firestone.getUser();
            
    }

    public ionViewDidLoad() {
        console.log('ionViewDidLoad PublicarCampanhaPage');
    }
    
    // If promoter isn't the patient
    public rHabilitar() {  
        document.getElementById('divHidden').hidden=false;
    };
    
    // If promoter is the patient
    public rDesabilitar() {
        document.getElementById('divHidden').hidden = true;
        document.getElementById('campIndicatedPatient').hidden=true;
    };
    
    // Shows indicated patient name input
    public iHabilitar() {
        document.getElementById('campIndicatedPatient').hidden=false;
    };
    
    // Hides indicated patient name input
    public iDesabilitar(){ 
        document.getElementById('campIndicatedPatient').hidden = true;
        this.utils.showAlert("Publicação Anônima", "Essa opção é indicada para publicações anônimas");
    };

    public setCampaign(event) {

        // Verifies if promoter data will be shown
        let campPromoterName = this.mostrarcampPromoterName ? event.target.campPromoterName.value ? event.target.campPromoterName.value : '' : '';
        let campPromoterEmail = this.mostrarcampPromoterEmail ? event.target.campPromoterEmail.value ? event.target.campPromoterEmail.value : '' : '';
        let campPromoterPhone = this.mostrarcampPromoterPhone ? event.target.campPromoterPhone.value ? event.target.campPromoterPhone.value : '' : '';
        let campPromoterCEP = this.mostrarcampPromoterAddress ? event.target.campPromoterCEP.value ? event.target.campPromoterCEP.value : '' : '';
        let campPromoterAddress = this.mostrarcampPromoterAddress ? event.target.campPromoterAddress.value ? event.target.campPromoterAddress.value : '' : '';
        let campPromoterAddressNum = this.mostrarcampPromoterAddress ? event.target.campPromoterAddressNum.value ? event.target.campPromoterAddressNum.value : '' : '';
        let campPromoterCity = this.mostrarcampPromoterAddress ? event.target.campPromoterCity.value ? event.target.campPromoterCity.value : '' : '';
        let campPromoterState = this.mostrarcampPromoterAddress ? event.target.campPromoterState.value ? event.target.campPromoterState.value : '' : '';

        // Uses firestone service to create new campaign
        if(this.firestone.setCampaign(
            this.validaFormulario.value.campBloodType,
            this.validaFormulario.value.campDonateType,
            this.campLimitDate,
            event.target.campBloodCenter.value,
            event.target.campBloodCenterCEP.value,
            event.target.campBloodCenterAddress.value,
            event.target.campBloodCenterAddressNum.value,
            event.target.campBloodCenterCity.value,
            event.target.campBloodCenterState.value,
            campPromoterName,
            campPromoterEmail,
            campPromoterPhone,
            campPromoterCEP,
            campPromoterAddress,
            campPromoterAddressNum,
            campPromoterCity,
            campPromoterState,
            this.validaFormulario.value.campPromoterIsPatient,
            event.target.campIndicatedPatient.value,
            event.target.campObservations.value
        )) {
            // If campaign is created successfully
            this.utils.showAlert("Sucesso", "Campanha publicada com sucesso!");
            event.target.reset();
            this.navCtrl.setRoot(HomePage);
        } else {
            // If an error occurs
            this.utils.showAlert("Erro", "Erro ao publicar campanha :/");
        }
    }

}


