import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Configuration} from "../../environments/configuration"
import {AddReminderPage} from "../add-reminder/add-reminder";
import {AddReminderService} from "../../providers/add-reminder";

@Component({
    selector: 'page-deadline-detail',
    templateUrl: 'deadline-detail.html',
})

export class DeadlineDetail {

    module: any = {};
    labels: any;
    showAdd: boolean;
    public user: any;
    public deadline: any;
    public reminders: any = [];
    course: any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public config: Configuration,
                private toastCtrl: ToastController,
                public addReminderService: AddReminderService) {

        this.labels = config.getLabels();
        this.deadline = this.navParams.get("deadline");
        this.showAdd = this.navParams.get("showAdd");
        this.user = config.getUser();
    }

    ionViewWillEnter() {
        this.loadReminders();
    }

    addReminder(deadline: any) {
        this.navCtrl.push(AddReminderPage, {deadline: this.deadline});
    }

    loadReminders() {
        this.reminders = [];
        this.addReminderService.loadReminders(this.user.user_Id, this.deadline.deadline_id).then(data => {
            let returnVal = JSON.parse(data._body);

            let that = this;
            returnVal.forEach(function (val) {
                that.reminders.push(val);
            });
            console.log(this.reminders);
        });
    }

    removeReminder(reminder){

      console.log("Löschen");
      console.log(reminder);

      this.addReminderService.deleteReminder(reminder.reminder_id).then(data => {
        this.presentToast(this.labels.REMINDER_REMOVED);
        this.loadReminders();
      });
    }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

}
