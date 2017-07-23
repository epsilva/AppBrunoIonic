import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
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
import { ConfiguracoesPage } from "../pages/configuracoes/configuracoes";
import { BancoHorasListaPage } from "../pages/banco-horas-lista/banco-horas-lista";
import { BancoHorasFormPage } from "../pages/banco-horas-form/banco-horas-form";
import { BancoHorasListItemComponent } from '../components/banco-horas-list-item/banco-horas-list-item';
import { BancoHorasProvider } from '../providers/banco-horas/banco-horas';
import { Camera } from "@ionic-native/camera";
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarioPage } from "../pages/calendario/calendario";
import { CalendarioFormPage } from "../pages/calendario-form/calendario-form";
import { CalendarioProvider } from '../providers/calendario/calendario';

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
    TabsPage,
    LoginPage,
    RegistrarPage,
    DocumentoListaItemComponent,
    DocumentoFormPage,
    DocumentoListaPage,
    ConfiguracoesPage,
    BancoHorasListaPage,
    BancoHorasFormPage,
    BancoHorasListItemComponent,
    CalendarioPage,
    CalendarioFormPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgCalendarModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    RegistrarPage,
    DocumentoFormPage,
    DocumentoListaPage,
    ConfiguracoesPage,
    BancoHorasListaPage,
    BancoHorasFormPage,
    CalendarioPage,
    CalendarioFormPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    DocumentoProvider,
    ListaDocumentoProvider,
    BancoHorasProvider,
    Camera,
    CalendarioProvider
  ]
})
export class AppModule {

  constructor() {
    firebase.initializeApp(firebaseConfig);
    var storage = firebase.storage();
  }

}
