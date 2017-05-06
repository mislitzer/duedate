import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html'
})
export class ReminderPage {

  public modules:Array<{title:string, name:string,dueDate:Date}>;

  constructor(public navCtrl: NavController) {

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
