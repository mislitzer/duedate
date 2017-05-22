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
  public deadlines:Array<{name:string,description:string,date:Date}>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public config: Configuration) {
    if(this.config.getModule() != null){
      this.module = this.config.getModule();
    }

    this.user = config.getUser();
    this.deadlines =[
      {
        name:"Blabla",
        description:"Assignment einreichen",
        date: new Date("February 4, 2016 10:13:00")
      },
      {
        name:"Blabla",
        description:"Assignment einreichen",
        date: new Date("February 4, 2016 10:13:00")
      }
    ]

  }


  addDeadline(event, module){
    this.navCtrl.push(DeadlinesPage);
  }

}
