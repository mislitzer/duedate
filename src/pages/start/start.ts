import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Register} from "../register/register";

@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class Start {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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
