import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Register} from "../register/register";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class Start {

  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage) {

    storage.get('user').then((val) => {
      if (val != null) {
        console.log(val);
        this.navCtrl.setRoot(TabsPage);
      }

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Start');
  }

  openLogin() {
    this.navCtrl.push(LoginPage);
  }

  openRegister() {
    this.navCtrl.push(Register);
  }

}