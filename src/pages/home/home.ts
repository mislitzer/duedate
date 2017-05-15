import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddModulePage } from '../add-module/add-module'
import {ModuleDetail} from '../module-detail/module-detail'
import {Configuration} from "../../environments/configuration";
import { HomeService } from '../../providers/home';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user:any;

  public modules:Array<{name:string,teacher:string}>;

  constructor(public navCtrl: NavController, public config: Configuration, public homeService: HomeService) {

    this.user = config.getUser();
    console.log(this.user);
    this.getModule();

    /*this.modules = [
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
    ]*/

  }

  getModule(){
    this.homeService.load(this.user.id)
      .then(data => {
        console.log(data);
      });

  }

  clicked(event){
    this.navCtrl.push(AddModulePage);
  }

  goToDetail(event, module){
    this.config.setModule(module);
    this.navCtrl.push(ModuleDetail)
  }
}
