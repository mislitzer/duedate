import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public modules:Array<{name:string,teacher:string}>;

  constructor(public navCtrl: NavController) {

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

}
