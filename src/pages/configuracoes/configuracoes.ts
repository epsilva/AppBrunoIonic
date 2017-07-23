import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, App, AlertController } from 'ionic-angular';
import { LoginProvider } from "../../providers/login/login";
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { Usuario } from "../../models/usuario";

declare var window: any;

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  private imageSrc: string;
  img:string;
  usuario:Usuario;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public app: App,
    public camera:Camera, 
    public alertCtrl: AlertController) {
      this.img = 'https://firebasestorage.googleapis.com/v0/b/appgerenciamentoocorrencias.appspot.com/o/images%2F1500750705.jpg?alt=media&token=61be8257-4c2c-4197-a520-d2319da8b516';
      this.usuario = new Usuario();
      firebase.database().ref('/usuario/' + this.loginProvider.currentUser.uid).once("value", (snapshot) => {
      this.usuario = snapshot.val();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');  
  }

  carregarImg(){

  }

  

  tirarFoto(){
    // let imageSource = (Device.isVirtual ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA);
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageSrc = 'data:image/jpeg;base64,' + imageData;
      // alert(this.imageSrc);
      this.upload();
    })
    .catch((erro) => {
      alert(erro);
    })
  }

   upload() {
    let storageRef = firebase.storage().ref();

    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child('images/'+filename+'.jpg');
    // alert('nome da imagem: '+ imageRef);

    imageRef.putString(this.imageSrc, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.showSuccesfulUploadAlert(snapshot);
      this.usuario.foto = snapshot.downloadURL;
      firebase.database().ref('/usuario/'+this.loginProvider.currentUser.uid).update(this.usuario);
    });

  }

  showSuccesfulUploadAlert(snapshot) {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    this.imageSrc = "";
  }


  sair(){
    this.loginProvider.exit();
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
