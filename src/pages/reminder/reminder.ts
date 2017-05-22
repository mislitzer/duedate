import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Configuration} from "../../environments/configuration";


@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html'
})
export class ReminderPage {

  public user:any;

  public modules:Array<{title:string, name:string,dueDate:Date}>;

  constructor(public navCtrl: NavController, public config: Configuration) {

    this.user = config.getUser();

    this.modules = [
      {
        title: "Modul 1",
        name:"Dokument einreichen",
        dueDate: new Date("February 4, 2016 10:13:00")
      },
      {
        title: "Modul 2",
        name:"Dokument einreichen",
        dueDate: new Date("February 4, 2016 10:13:00")
      }
    ]

  }


}

