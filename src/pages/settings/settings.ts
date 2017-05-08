import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public student:{id:string, email:string, klas:string};


  constructor(public navCtrl: NavController) {

    this.student =
      {
        id:"3405983405",
        email:"student@mail.com",
        klas:"IT05"
      }

  }

}