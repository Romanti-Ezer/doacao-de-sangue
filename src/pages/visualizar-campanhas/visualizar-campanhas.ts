import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoneService } from '../../services/firestone.service';
import { Campanha } from '../../services/firestone.service';

/**
* Generated class for the VisualizarCampanhasPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-visualizar-campanhas',
    templateUrl: 'visualizar-campanhas.html',
})
export class VisualizarCampanhasPage {
    
    campanhas: Observable<Campanha[]>;
    estado:any = false;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService) {
        this.campanhas = this.firestone.getCampanhas();
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad VisualizarCampanhasPage');
    }
    
    public buttonClicked: boolean = false; 
    
    public onButtonClick(event) {
        let card = this.getClosest(event.target, "js-item-doacao");
        this.estado = !this.estado;
        let cardBoxInfo = card.querySelectorAll(".doacao-info")[0];

        if (cardBoxInfo.classList.contains("doacao-info--is-active")) {
            cardBoxInfo.classList.remove("doacao-info--is-active")
        } else {
            cardBoxInfo.classList.add("doacao-info--is-active")
        }
    }
    
    public filtrarCampanha(event) {
        this.campanhas = this.firestone.filterCampanha(this.estado, event.target.cidade.value);
    }

    getClosest (elem, clazz) {    
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            console.log(elem.classList);
            if ( elem.classList.contains( clazz ) ) return elem;
        }
        return null;
    };
}