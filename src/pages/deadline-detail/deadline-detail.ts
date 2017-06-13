import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Configuration} from "../../environments/configuration"
import {AddReminderPage} from "../add-reminder/add-reminder";
import {AddReminderService} from "../../providers/add-reminder";

@Component({
    selector: 'page-deadline-detail',
    templateUrl: 'deadline-detail.html',
})

//Noch von module-detail kopiert -> noch zu überarbeiten


export class DeadlineDetail {

    module: any = {};
    labels:any;
    showAdd:boolean;
    public user: any;
    public deadline:any;
    public reminders: any = [];
    course:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public config: Configuration,
                public addReminderService: AddReminderService) {

        this.labels = config.getLabels();
        this.deadline = this.navParams.get("deadline");
        this.showAdd = this.navParams.get("showAdd");
        this.user = config.getUser();
    }

  ionViewWillEnter() {
    this.loadReminders();
  }

  addReminder(deadline: any){
    console.log("mimi");
    this.navCtrl.push(AddReminderPage, {deadline: this.deadline});
  }

  loadReminders(){
    this.addReminderService.loadReminders(this.user.user_Id, this.deadline.deadline_id).then(data => {
      let returnVal = JSON.parse(data._body);

      let that = this;
      console.log(returnVal);
      returnVal.forEach(function(val) {
        that.reminders.push([val]);
      });
      console.log(this.reminders);
    });
  }

}
