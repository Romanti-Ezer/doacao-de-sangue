import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoneService } from '../../services/firestone.service';
import { Doacao } from '../../services/firestone.service';
import { Observable } from 'rxjs';

/**
* Generated class for the MinhasDoacoesPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-minhas-doacoes',
    templateUrl: 'minhas-doacoes.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinhasDoacoesPage {
    doacoes: Observable<Doacao[]>;
    diasParaDoar =  0;
    dataMaisRecente = 0;
    nroDoacoes: number = 0;
    podeDoar = false;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService, private cd: ChangeDetectorRef) {
        this.doacoes = this.firestone.getDoacoes();
        this.nroDoacoes = 0;
    }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad MinhasDoacoesPage');
    }
    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    DifferenceFromToday(last) {
        if (last) {
            let now = new Date();
            // Considerando que é homem
            let temp = new Date(this.dataMaisRecente*1000);
            this.diasParaDoar = 60 - Math.round(( now.getTime() - temp.getTime())/(1000*60*60*24));
            console.log("Dias para doar: ", this.diasParaDoar);
            if (this.diasParaDoar > 0) {
                this.podeDoar = false;
            } else {
                this.podeDoar = true;
            }
        }
    }
    getMS(s) {
        if (!this.dataMaisRecente || s > this.dataMaisRecente) this.dataMaisRecente = s;
        console.log("s: ", s);
        console.log("this.dataMaisRecente: ", this.dataMaisRecente)
        return s*1000;
    }
    increaseNroDoacoes() {
        this.nroDoacoes = this.nroDoacoes + 1;
        return '';
    }
    resetNroDoacoes() {
        this.nroDoacoes = 0;
    }
}
