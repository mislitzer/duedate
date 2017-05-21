import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs' ;
import {LoginService} from '../../providers/login';
import {Storage} from "@ionic/storage";
import {Configuration} from "../../environments/configuration";
//import {Deeplinks} from  '@ionic-native';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  login: any = {};

  constructor(public navCtrl: NavController, public toastController: ToastController,
              public loginService: LoginService, public storage: Storage, public config: Configuration) {
  }

  loginUser() {
    console.log(this.login.name + " " + this.login.password)
    if (this.login.name && this.login.password) {
      this.loginUserRequest();
    }
    else {
      this.showToast("Please fill out all input fields!", 3000, "bottom");
    }

  }

  loginUserRequest() {
    this.loginService.load(this.login)
      .then(data => {
        console.log(data);
        if (data && data != null && data._body != "User not found") {
          this.saveUserLocal(data._body);
          this.navCtrl.push(TabsPage);
        } else if (data._body == "User not found") {
          this.showToast("User not found", 3000, "bottom");
        } else if (data._body == "Password incorrect") {
          this.showToast("Password incorrect", 3000, "bottom");
        }
      })

  }

  saveUserLocal(body){
    this.storage.set('user', body);
    this.config.setUser(JSON.parse(body));
  }

  showToast(message: string, speed: number, position: string) {
    let toast = this.toastController.create({
      message: message,
      duration: speed,
      position: position
    });
    toast.present();
  }


}
