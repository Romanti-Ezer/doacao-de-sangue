import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { FirestoneService } from '../../services/firestone.service';
import { Campaign } from '../../services/firestone.service';
declare var google: any;




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
    protected campaigns: Observable<Campaign[]>;
    protected state: string = '';
    @ViewChild('map') map: ElementRef;
  
    constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService) {
        this.campaigns = this.firestone.getCampaign();
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

    ionViewDidLoad() {
      this.showMap();
    }
  
    showMap() {
      const position = new google.maps.LatLng(-23.5505, -46.6333);
  
      const options = {
        center: position,
        zoom: 10,
        mapTypeId: 'hybrid'
      };
  
      const map = new google.maps.Map(this.map.nativeElement, options);
  
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
    }


}