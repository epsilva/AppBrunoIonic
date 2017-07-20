import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { LoginProvider } from '../providers/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { LoginPage } from "../pages/login/login";
import { HttpModule } from '@angular/http';
import { DocumentoProvider } from '../providers/documento/documento';
import { DocumentoListaItemComponent } from '../components/documento-lista-item/documento-lista-item';
import { DocumentoListaPage } from '../pages/documento-lista/documento-lista';
import { DocumentoFormPage } from '../pages/documento-form/documento-form';
import { ListaDocumentoProvider } from '../providers/lista-documento/lista-documento';

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
    HomePage,
    TabsPage,
    LoginPage,
    RegistrarPage,
    DocumentoListaItemComponent,
    DocumentoFormPage,
    DocumentoListaPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegistrarPage,
    DocumentoFormPage,
    DocumentoListaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    DocumentoProvider,
    ListaDocumentoProvider
  ]
})
export class AppModule {

  constructor(){
    firebase.initializeApp(firebaseConfig);
  }

}
