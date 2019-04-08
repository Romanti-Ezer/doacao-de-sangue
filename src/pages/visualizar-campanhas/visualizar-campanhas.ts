import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService) {
    this.campanhas = this.firestone.getCampanhas();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VisualizarCampanhasPage');
  }

}
