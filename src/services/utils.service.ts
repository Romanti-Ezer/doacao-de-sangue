import { Injectable } from "@angular/core";
import { AlertController } from 'ionic-angular';

@Injectable()
export class UtilsService {
    constructor(
        private alertCtrl: AlertController
    ) {}
    public showAlert(title, subtitle) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }
}