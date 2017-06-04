import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {DeadlinesService} from "../../providers/deadlines"
import {HomePage} from "../home/home"

/**
 * Generated class for the Deadlines page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-deadlines',
  templateUrl: 'deadlines.html',
})
export class DeadlinesPage {

  showList: boolean;
  deadline:any = {};
  labels:any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,public config: Configuration, public deadlineService: DeadlinesService, private toastCtrl: ToastController ) {
    this.labels = config.getLabels();
  }

  sendDeadline(){
    if (this.deadline.name.trim().length > 1 && this.deadline.name.trim().length < 255) {
      this.presentLoadingDefault();
      this.deadlineService.load(this.deadline)
        .then(data => {
          console.log(data);
          this.navCtrl.push(HomePage);
          this.loading.dismiss();
        });
    }else {
      this.presentToast();
      this.navCtrl.push(DeadlinesPage);
    }
  }

  abort(){
    this.navCtrl.setRoot(HomePage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.labels.MISTAKE_ADDDEADLINES,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
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

  autoCompleteClass(input){
    this.showList = true;

    let val = input.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      //todo: liste für class vorschläge
    }
    else {
      //todo: wenn keine eingabe gemacht wurde
    }
  }

}
