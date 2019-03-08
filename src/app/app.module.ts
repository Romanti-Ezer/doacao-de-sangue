import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    NgxErrorsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC4JCpke6gEZh1Sy0tMiAnigevPOYy02Wg",
      authDomain: "doacao-de-sangue-10147.firebaseapp.com",
      databaseURL: "https://doacao-de-sangue-10147.firebaseio.com",
      projectId: "doacao-de-sangue-10147",
      storageBucket: "doacao-de-sangue-10147.appspot.com",
      messagingSenderId: "26782982541"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
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
