import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoneService } from '../../services/firestone.service';
import { Donation } from '../../services/firestone.service';
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
    private donations: Observable<Donation[]>;
    private daysToDonate =  0;
    private mostRecentDate = 0;
    private numOfDonations: number = 0;
    private canDonate = false;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService, private cd: ChangeDetectorRef) {
        this.donations = this.firestone.getDonation();
        this.numOfDonations = 0;
    }
    
    public ionViewDidLoad() {
        console.log('ionViewDidLoad MinhasDoacoesPage');
    }
    public ngAfterViewInit() {
        this.cd.detectChanges();
    }

    public DifferenceFromToday(last) {
        if (last) {
            let now = new Date();
            // Considerando que é homem
            let temp = new Date(this.mostRecentDate*1000);
            this.daysToDonate = 60 - Math.round(( now.getTime() - temp.getTime())/(1000*60*60*24));
            console.log("Dias para doar: ", this.daysToDonate);
            if (this.daysToDonate > 0) {
                this.canDonate = false;
            } else {
                this.canDonate = true;
            }
        }
    }
    public getMS(s) {
        if (!this.mostRecentDate || s > this.mostRecentDate) this.mostRecentDate = s;
        console.log("s: ", s);
        console.log("this.mostRecentDate: ", this.mostRecentDate)
        return s*1000;
    }
    public increaseDonationNumber() {
        this.numOfDonations = this.numOfDonations + 1;
        return '';
    }
    public resetDonationNumber() {
        this.numOfDonations = 0;
    }
}
