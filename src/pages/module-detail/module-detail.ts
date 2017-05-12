import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Configuration} from "../../environments/configuration";

/**
 * Generated class for the ModuleDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-module-detail',
  templateUrl: 'module-detail.html',
})
export class ModuleDetail {

  module: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: Configuration) {
    if(this.config.getModule() != null){
      this.module = this.config.getModule();
    }
  }

}
