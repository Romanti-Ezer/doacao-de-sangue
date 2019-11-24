import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreService } from '../../services/firestore.service';
import { UtilsService } from '../../services/utils.service';
import { HomePage } from '../home/home';
import { CepService } from '../../services/cep.service';

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
    protected logradouro = '';
    protected cidade = '';
    protected uf = '';
    protected cep = '';
    protected invalidFields = '';
    protected fieldsNames = {
        "campDonateType": "Tipo de doação",
        "campBloodType": "Tipo de sangue",
        "nome": "Nome do hemocentro",
        "cep": "CEP do hemocentro",
        "endereco": "Endereço do hemocentro",
        "numero": "Número do hemocentro",
        "cidade": "Cidade do hemocentro",
        "uf": "Estado do hemocentro",
        "campPromoterIsPatient": "Eu sou paciente",
        "campPromoterWantsToIndicatePatient": "Quero indicar um paciente"
    }

    public ionViewWillLeave() {
        this.appCtrl.getRootNav().setRoot(HomePage);
    }


    constructor(
        public appCtrl: App,
        public utils: UtilsService, 
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public firestone: FirestoreService,
        public fb: FormBuilder,
        public cepService: CepService
        ) {
            this.validaFormulario = fb.group({
                campDonateType: ['', Validators.required],
                campBloodType: ['', Validators.required],
                nome: ['', Validators.compose([Validators.required, Validators.maxLength(60)])],
                cep: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(8)])],      
                endereco: ['', Validators.compose( [Validators.required])],
                numero: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(5)])],
                cidade: ['', Validators.compose([Validators.required,])],
                uf: ['', Validators.compose([Validators.required,Validators.minLength(2), Validators.maxLength(2)])],
                obs: ['', Validators.compose([Validators.maxLength(200)])],
                campPromoterIsPatient: ['', Validators.required],
                campPromoterWantsToIndicatePatient: [''],

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
    public iDesabilitar() {
        document.getElementById('campIndicatedPatient').hidden = true;
        this.utils.showAlert("Publicação Anônima", "Essa opção é indicada para publicações anônimas");
    };

    public getAddress(event){
        if (this.cep.length < 8)
            return false;
        let lthis = this;
        this.cepService.getAddress(this.cep)
            .subscribe(data => {
                lthis.logradouro = data.logradouro;
                lthis.cidade = data.localidade;
                lthis.uf = data.uf;
            })
    }

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
            this.cep,
            this.logradouro,
            event.target.campBloodCenterAddressNum.value,
            this.cidade,
            this.uf,
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

    
    // Returns an array of invalid control/group names, or a zero-length array if 
    // no invalid controls/groups where found 
    public findInvalidFields() {
        let formToInvestigate = this.validaFormulario;
        var invalidControls:string[] = [];
        let recursiveFunc = (form:FormGroup) => {
            Object.keys(form.controls).forEach(field => { 
                const control = form.get(field);
                if (control.invalid) invalidControls.push(field);
                if (control instanceof FormGroup) {
                    recursiveFunc(control);
                }      
            });
        }
        recursiveFunc(formToInvestigate);
        this.setInvalidFields(invalidControls);
    }

    public setInvalidFields(invalidControls:string[]) {
        let message = '';
        invalidControls.forEach((field, index) => {
            if (index > 0) { 
                message += ("<br/>" + this.fieldsNames[field]);
            } else {
                message += this.fieldsNames[field];
            }
        });
        this.invalidFields = message;
    }
    public checkIfIndicatePatientIsRequired() {
        if (this.validaFormulario.value.campPromoterIsPatient == "false") {
            this.validaFormulario.controls["campPromoterWantsToIndicatePatient"].setValidators([Validators.required]);
        } else {
            this.validaFormulario.get("campPromoterWantsToIndicatePatient").clearValidators();
        }
        this.validaFormulario.controls["campPromoterWantsToIndicatePatient"].updateValueAndValidity();
        this.findInvalidFields();
    }
}


