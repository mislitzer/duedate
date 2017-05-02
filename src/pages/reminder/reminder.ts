import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'reminder.html'
})
export class ReminderPage {

  public modules:Array<{name:string,dueDate:Date}>;

  constructor(public navCtrl: NavController) {

    this.modules = [
      {
        name:"Modul 1",
        dueDate: new Date("February 4, 2016 10:13:00")
      },
      {
        name:"Modul 2",
        dueDate: new Date("February 4, 2016 10:13:00")
      }
    ]

  }


}
