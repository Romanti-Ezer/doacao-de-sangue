import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FirestoreService } from '../../services/firestore.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public firestone: FirestoreService,
        public menuCtrl:MenuController) {
            this.menuCtrl.enable(true);
            this.firestone.updateCollectionRef();
    }       
}