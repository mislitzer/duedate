import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DeadlinesPage} from "../deadlines/deadlines";
import {Configuration} from "../../environments/configuration";
import {AddModuleService} from '../../providers/add-module';
import {MapModuleService} from "../../providers/mapModuleUser";


@Component({
  selector: 'page-add-reminder',
  templateUrl: 'add-reminder.html',
})
export class AddReminderPage {

  module: any = {};
  user: any;
  loading: any;
  labels:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: Configuration,
              public addModuleService: AddModuleService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              public mapModuleService: MapModuleService) {
    this.user = this.config.getUser();
    this.labels = config.getLabels();
  }

  sendReminder() {

  }

}
