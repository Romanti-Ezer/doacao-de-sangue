import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private auth: AngularFireAuth) {

  }
  
  logout() {
    this.auth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }
}