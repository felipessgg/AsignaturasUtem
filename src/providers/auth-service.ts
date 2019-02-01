import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from "ionic-angular";

@Injectable()
export class AuthService {

  rut:null;
  password:null;
  apiKey:any;

  constructor(public http: Http, private alertCtrl: AlertController) {
  }
  
  postData(credenciales){

    return new Promise((resolve, reject) =>{

      let data = {rut: credenciales.rut, password: credenciales.password};
      let apiUrl = 'https://api.sebastian.cl/academia/api/v1/authentication/authenticate';

      this.http.post(apiUrl, data).subscribe(
        (res) => {
          resolve(res.json());
          //guardamos la apiKey
          this.apiKey = JSON.parse(res['_body']).apiKey;
        
        },(error) => {console.log(error);}
      )

    });

  }

}