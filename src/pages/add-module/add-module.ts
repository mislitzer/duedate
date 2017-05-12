import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DeadlinesPage} from "../deadlines/deadlines";
import {Configuration} from "../../environments/configuration";

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

  module: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: Configuration) {
  }

  clicked(event){
    this.config.setModule(this.module);
    console.log(this.module.name + " " + this.module.semester);
    this.navCtrl.push(DeadlinesPage);
  }
}
