import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Configuration} from "../../environments/configuration"
import {AddReminderPage} from "../add-reminder/add-reminder";

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
    public reminders: Array<{date: Date, time: string}>;
    course:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public config: Configuration) {

        this.labels = config.getLabels();
        this.deadline = this.navParams.get("deadline");
        this.showAdd = this.navParams.get("showAdd");
        this.user = config.getUser();
    }


  addReminder(deadline: any){
    console.log("mimi");
    this.navCtrl.push(AddReminderPage, {deadline: this.deadline});

  }

}
