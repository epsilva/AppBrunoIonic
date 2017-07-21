import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrarPage } from '../registrar/registrar';
import { LoginProvider } from '../../providers/login/login';
import { Credential } from '../../models/credential';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credential: Credential;
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider, public menuCtrl: MenuController, public formBuilder: FormBuilder) {
    this.credential = new Credential();

    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'senha': ['', Validators.required]
    });

    

  }
  

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {

  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!(!user)) {
        this.navCtrl.setRoot(TabsPage);
        // this.loginProvider.registrarUserInfo(user);
      }
    });
  }

  logarComEmail() {
    this.loginProvider.loginWithCredential(this.credential);
  }

  logarComGoogle() {
    this.loginProvider.loginWithGoogle();
  }

  logarFacebook() {
    this.loginProvider.loginWithFacebook();
  }

  registrar() {
    //this.sair();
    this.navCtrl.push(RegistrarPage);
  }

  sair() {
    this.loginProvider.exit();
  }

}
