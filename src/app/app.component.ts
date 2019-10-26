import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PublicarCampanhaPage } from '../pages/publicar-campanha/publicar-campanha';
import { VisualizarCampanhasPage } from '../pages/visualizar-campanhas/visualizar-campanhas';
import { MinhasDoacoesPage } from '../pages/minhas-doacoes/minhas-doacoes';
import { GuiaInformativoPage } from '../pages/guia-informativo/guia-informativo';

import { AuthService } from '../services/auth.service';
import { MinhaContaPage } from '../pages/minha-conta/minha-conta';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) public nav: Nav;
    rootPage:any = LoginPage;
    
    public pages = [
        { titulo: 'Início', component: HomePage, icone: 'home'},
        { titulo: 'Publicar Campanha', component: PublicarCampanhaPage, icone: 'person-add'},
        { titulo: 'Visualizar Campanhas', component: VisualizarCampanhasPage, icone: 'eye'},
        { titulo: 'Minhas Doações', component: MinhasDoacoesPage, icone: 'water'},
        { titulo: 'Guia Informativo', component: GuiaInformativoPage, icone: 'help-circle'},
        { titulo: 'Minha Conta', component: MinhaContaPage, icone: 'person'},
    ]
    
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            splashScreen.hide();
            statusBar.styleLightContent();

            
        });

    }
    
    goToPage(component) {
        if (component === HomePage) {
            this.nav.setRoot(component);
        } else {
            this.nav.push(component);
        }
    }
    
    logout() {
        // Se retornar true (que deu certo o logout, volta para o login)
        if (this.auth.signOut()) {
            this.nav.setRoot(LoginPage);
        }
    }

   
    
}



