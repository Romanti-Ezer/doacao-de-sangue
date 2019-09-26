import { Component, ElementRef, AfterViewInit } from '@angular/core';
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

export class VisualizarCampanhasPage implements AfterViewInit {
    protected campaigns: Observable<Campaign[]>;
    protected state: string = '';
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService, private elem: ElementRef) {
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
    
    ngAfterViewInit() {
        setTimeout(() => {
            let elements = this.elem.nativeElement.querySelectorAll('.card-map');
            elements.forEach(element => {
                this.showMap(element, element.getAttribute("data-address"));
            });
        }, 500);
    }
    
    showMap(element, address) {
        const position = new google.maps.LatLng(-23.5505, -46.6333);
        
        const options = {
            center: position,
            zoom: 13,
            mapTypeId: 'roadmap'
        };

        const map = new google.maps.Map(element, options);
        
        var geocoder = new google.maps.Geocoder();
        setTimeout(() => {
            this.geocodeAddress(geocoder, map, address);
        }, 350);
    }

    geocodeAddress(geocoder, resultsMap, address) {
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                resultsMap.setCenter(results[0].geometry.location);
                /* tslint:disable:no-unused-variable */
                var marker = new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
}