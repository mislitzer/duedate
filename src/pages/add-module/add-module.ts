import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DeadlinesPage} from "../deadlines/deadlines";

/**
 * Generated class for the AddModule page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-module',
  templateUrl: 'add-module.html',
})
export class AddModulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddModule');
  }

  clicked(event){
    this.navCtrl.push(DeadlinesPage);
  }

}
