import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {AddReminderService} from '../../providers/add-reminder';


@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminderPage {

  module:any = {};
  user:any;
  loading:any;
  labels:any;
  value:any;
  reminder:any = {};
  deadline:any;

  constructor(public navCtrl:NavController,
              public navParams:NavParams,
              public config:Configuration,
              public loadingCtrl:LoadingController,
              public addReminderService:AddReminderService) {
    this.user = this.config.getUser();
    this.labels = config.getLabels();
    this.deadline = this.navParams.get("deadline");
    console.log(this.deadline);
  }

  sendReminder() {

    console.log('test');
    console.log(this.user);

    this.reminder.user_id = this.user.user_Id;
    this.reminder.deadline_id = this.deadline.deadline_id;

    let deadlineDate = new Date(parseInt(this.deadline.deadlinetime));
    switch (this.value) {
      case '1':
        this.reminder.time = deadlineDate.setHours(deadlineDate.getHours() - 1);
        break;

      case '2':
        this.reminder.time = deadlineDate.setHours(deadlineDate.getHours() - 24);
        break;

      case '3':
        this.reminder.time = deadlineDate.setHours(deadlineDate.getHours() - 72);
        break;

      case '4':
        this.reminder.time = deadlineDate.setHours(deadlineDate.getHours() - 168);
        break;

      default:
        console.log("Error");
        break;
    }

    this.addReminderService.load(this.reminder).then(data => {
      this.presentLoadingDefault();
      console.log(data);
      this.navCtrl.pop();
      this.loading.dismiss();
    });
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: this.labels.LOADING,
      spinner: 'dots'
    });

    setTimeout(() => {
      this.loading.dismiss();
    }, 25000);
    this.loading.present();
  }

}
