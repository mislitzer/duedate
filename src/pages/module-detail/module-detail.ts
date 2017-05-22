import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Configuration} from "../../environments/configuration"
import {DeadlinesPage} from "../deadlines/deadlines"

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

  module: any = {};
  public user: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public config: Configuration) {
    if(this.config.getModule() != null){
      this.module = this.config.getModule();
    }

    this.user = config.getUser();

  }


  addDeadline(event, module){
    this.navCtrl.push(DeadlinesPage);
  }

}
