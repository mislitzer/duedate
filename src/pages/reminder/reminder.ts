import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {AddReminderService} from "../../providers/add-reminder";


@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html'
})
export class ReminderPage {

  public user:any;
  public reminders: any = [];
  public tomorrowReminders: any = [];
  public nextWeekReminders: any = [];
  public semesterReminders: any = [];
  public empty: boolean = false;

  public modules:Array<{title:string, name:string,dueDate:Date}>;

  constructor(public navCtrl: NavController,
              public config: Configuration,
              public addReminderService: AddReminderService) {

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

  ionViewWillEnter() {
    this.loadRemindersList();
  }

  loadRemindersList() {
    this.reminders = [];
    this.addReminderService.loadRemindersAll(this.user.user_Id).then(data => {
      let returnVal = JSON.parse(data._body);

      let that = this;
      returnVal.forEach(function (val) {
        that.reminders.push(val);
      });

      this.tomorrowReminders = [];
      this.nextWeekReminders = [];
      this.semesterReminders = [];

      this.reminders.forEach(function(val){
        let date = new Date();
        let differ = val.reminderTime - date.getTime();

        if(differ < 86400000 && differ > 0){
          that.tomorrowReminders.push(val);
        }else if(differ > 86400000 && differ < 604800000){
          that.nextWeekReminders.push(val);
        }else if( differ > 604800000){
          that.semesterReminders.push(val);
        }

      });
      if(this.tomorrowReminders.length != 0 || this.nextWeekReminders.length != 0 || this.semesterReminders.length != 0){
        this.empty = false;
      }else{
        this.empty = true;
      }
    });
  }


}

