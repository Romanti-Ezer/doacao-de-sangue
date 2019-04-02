import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// Firebase Auth
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

// Firestone
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Pages and Components
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PublicarCampanhaPage } from '../pages/publicar-campanha/publicar-campanha';
import { VisualizarCampanhasPage } from '../pages/visualizar-campanhas/visualizar-campanhas';
import { MinhasDoacoesPage } from '../pages/minhas-doacoes/minhas-doacoes';
import { GuiaInformativoPage } from '../pages/guia-informativo/guia-informativo';

import { credentials } from './config';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PublicarCampanhaPage,
    VisualizarCampanhasPage,
    MinhasDoacoesPage,
    GuiaInformativoPage
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    NgxErrorsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    PublicarCampanhaPage,
    VisualizarCampanhasPage,
    MinhasDoacoesPage,
    GuiaInformativoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthService
  ]
})

export class AppModule {}

