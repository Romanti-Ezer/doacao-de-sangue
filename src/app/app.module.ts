import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


// Firebase Auth and Services
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

// Firestone
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Pages and Components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { EsqueciMinhaSenhaPage } from '../pages/esqueci-minha-senha/esqueci-minha-senha';
import { PublicarCampanhaPage } from '../pages/publicar-campanha/publicar-campanha';
import { VisualizarCampanhasPage } from '../pages/visualizar-campanhas/visualizar-campanhas';
import { MinhasDoacoesPage } from '../pages/minhas-doacoes/minhas-doacoes';
import { GuiaInformativoPage } from '../pages/guia-informativo/guia-informativo';

import { credentials } from './config';
import { MinhaContaPage } from '../pages/minha-conta/minha-conta';
import { FirestoreService } from '../services/firestore.service';
import { CepService } from '../services/cep.service';
import { CadastrarDoacaoPage } from '../pages/cadastrar-doacao/cadastrar-doacao';

import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        LoginPage,
        SignupPage,
        EsqueciMinhaSenhaPage,
        PublicarCampanhaPage,
        VisualizarCampanhasPage,
        MinhasDoacoesPage,
        GuiaInformativoPage,
        MinhaContaPage,
        CadastrarDoacaoPage
    ],
    imports: [
        BrowserModule,
        FormsModule,    
        NgxErrorsModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
        }),
        AngularFireModule.initializeApp(credentials.firebase),
        AngularFirestoreModule.enablePersistence(),
        AngularFireDatabaseModule,
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        LoginPage,
        SignupPage,
        EsqueciMinhaSenhaPage,
        PublicarCampanhaPage,
        VisualizarCampanhasPage,
        MinhasDoacoesPage,
        GuiaInformativoPage,
        MinhaContaPage,
        CadastrarDoacaoPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AngularFireAuth,
        AuthService,
        UtilsService,
        FirestoreService,
        CepService
    ]
})

export class AppModule {}

