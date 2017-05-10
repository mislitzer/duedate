import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddModulePage } from '../add-module/add-module'
import {ModuleDetail} from '../module-detail/module-detail'
import {Configuration} from "../../environments/configuration";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user:any;

  public modules:Array<{name:string,teacher:string}>;

  constructor(public navCtrl: NavController, public config: Configuration) {

    this.user = config.getUser();
    console.log(this.user);

    this.modules = [
      {
        name:"Modul 1",
        teacher:"Lektor 1"
      },
      {
        name:"Modul 2",
        teacher: "Lektor 1"
      },
      {
        name:"Modul 2",
        teacher: "Lektor 1"
      },
      {
        name:"Modul 2",
        teacher: "Lektor 1"
      },
      {
        name:"Modul 2",
        teacher: "Lektor 1"
      }
    ]

  }

  clicked(event){
    this.navCtrl.push(AddModulePage);
  }

  goToDetail(event){
    this.navCtrl.push(ModuleDetail)
  }
}
