import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoneService } from '../../services/firestone.service';
import { Donation } from '../../services/firestone.service';

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
    protected donations: Donation[] = [];
    protected daysToDonate = 0;
    protected mostRecentDate: Date;
    protected numOfDonations: number = 0;
    protected canDonate = false;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public firestone: FirestoneService, protected cd: ChangeDetectorRef) {
        this.firestone.getDonation().subscribe((donations : Donation[])=>{
            this.donations = donations;
            this.donations.sort(function(a, b){
                var keyA = new Date(a.donatDate),
                    keyB = new Date(b.donatDate);
                // Compare the 2 dates
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });
            this.donations.reverse();

            this.numOfDonations = donations.length;
            this.mostRecentDate = new Date(this.donations[0].donatDate.seconds * 1000);
            this.DifferenceFromToday(this.donations[0].donatDate);
            this.cd.detectChanges();
        });
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
            let temp = this.mostRecentDate;

            // Considerando que é homem
            this.daysToDonate = 60 - Math.round(( now.getTime() - temp.getTime())/(1000*60*60*24));
            if (this.daysToDonate > 0) {
                this.canDonate = false;
            } else {
                this.canDonate = true;
            }
        }
    }
    public getMS(s) {
        if (!this.mostRecentDate || s > this.mostRecentDate) this.mostRecentDate = s;
        return s*1000;
    }
}