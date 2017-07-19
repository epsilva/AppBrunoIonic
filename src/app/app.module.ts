import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { LoginProvider } from '../providers/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { LoginPage } from "../pages/login/login";
import { HttpModule } from '@angular/http';

export const firebaseConfig = {
  apiKey: "AIzaSyAYBfEuw_onYke-woAchRQgW7jztE4FGzQ",
  authDomain: "appgerenciamentoocorrencias.firebaseapp.com",
  databaseURL: "https://appgerenciamentoocorrencias.firebaseio.com",
  projectId: "appgerenciamentoocorrencias",
  storageBucket: "appgerenciamentoocorrencias.appspot.com",
  messagingSenderId: "781212574413"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrarPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider
  ]
})
export class AppModule {

  constructor(){
    firebase.initializeApp(firebaseConfig);
  }

}
