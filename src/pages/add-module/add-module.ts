import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DeadlinesPage } from "../deadlines/deadlines";
import { Configuration } from "../../environments/configuration";
import { AddModuleService } from '../../providers/add-module';

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
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: Configuration, public addModuleService: AddModuleService) {
    this.user = this.config.getUser();
    console.log(this.user.user_Id);
  }

  sendModule(){
    this.module.user_id = this.user.user_Id;
    this.addModuleService.load(this.module)
      .then(data => {
      console.log(data);
      this.config.setModule(data);
      this.saveModulLocal(data._body);
      this.navCtrl.push(DeadlinesPage);
    });

  }

  saveModulLocal(body){
    this.config.setModule(JSON.parse(body));
  }
}
