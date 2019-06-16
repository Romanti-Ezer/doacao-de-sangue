import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoneService } from '../../services/firestone.service';
import { Campaign } from '../../services/firestone.service';

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
    
    private campaigns: Observable<Campaign[]>;
    private state: string = '';
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService) {
        this.campaigns = this.firestone.getCampaign();
    }
    
    public ionViewDidLoad() {
        console.log('ionViewDidLoad VisualizarCampanhasPage');
    }
    
    public viewMore(event) {
        let card = this.getClosest(event.target, "js-item-doacao");
        let cardBoxInfo = card.querySelectorAll(".doacao-info")[0];

        if (cardBoxInfo.classList.contains("doacao-info--is-active")) {
            cardBoxInfo.classList.remove("doacao-info--is-active")
        } else {
            cardBoxInfo.classList.add("doacao-info--is-active")
        }
    }
    
    public filterCampaign(event) {
        this.campaigns = this.firestone.filterCampaign(this.state, event.target.cidade.value);
    }

    public getClosest (elem, clazz) {    
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.classList.contains( clazz ) ) return elem;
        }
        return null;
    };
}