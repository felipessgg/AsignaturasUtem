import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from "../../providers/auth-service";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  resposeData : any;
  userData = {"rut": "", "password": ""};

  constructor(public navCtrl: NavController, public authService: AuthService, private toastCtrl:ToastController, public alertCtrl: AlertController) {
  }

  login(){
   if(this.userData.rut && this.userData.password){ 
    this.authService.postData(this.userData).then((result) =>{
      
      this.presentToast('Credenciales Validas');

      localStorage.setItem( 'userData', JSON.stringify(this.resposeData) )
        this.navCtrl.setRoot(HomePage);
      
    }, (err) => {
      //Mensaje de conexion fallida
      this.presentToast("Rut o contraseña incorrectos");
    });
   }
   else{
    this.presentToast("Ingrese rut y contraseña");
   }
  
  }
  //Definiciones de ventana emergente
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}