import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

import { AuthService } from '../services/auth.service';


import { TestePage } from '../pages/teste/teste';
import { SobrePage } from '../pages/sobre/sobre';
import { CadastroPacientePage } from '../pages/paciente/paciente';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) public nav: Nav;
  rootPage:any = LoginPage;

  public pages = [
    { titulo: 'TestePage', component: TestePage, icone: 'logo-freebsd-devil'},
    { titulo: 'SobrePage', component: SobrePage, icone: 'log-out'},
    { titulo: 'PacientePage', component: CadastroPacientePage, icone: 'logo-freebsd-devil'}
  ]

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

    goToPage(component) {
      this.nav.push(component);
    }
    
    logout() {
      // Se retornar true (que deu certo o logout, volta para o login)
      if (this.auth.signOut()) {
        this.nav.setRoot(LoginPage);
      }
    }
    
  }



