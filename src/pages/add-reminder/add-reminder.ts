import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";


@Component({
    selector: 'page-add-reminder',
    templateUrl: 'add-reminder.html',
})
export class AddReminderPage {

    module: any = {};
    user: any;
    loading: any;
    labels: any;
    reminder: any;
    deadline: any;
    reminderRadio:any = "select1";

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public config: Configuration) {

        this.user = this.config.getUser();
        this.labels = config.getLabels();
        this.deadline = this.navParams.get("deadline");

    }

    sendReminder() {
        console.log(this.reminderRadio);
        console.log(this.deadline);
        console.log(this.user);
    }

}
