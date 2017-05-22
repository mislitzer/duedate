import { Component } from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { DeadlinesPage } from "../deadlines/deadlines";
import { Configuration } from "../../environments/configuration";
import { AddModuleService } from '../../providers/add-module';

/**
 * Generated class for the AddModule page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-module',
  templateUrl: 'add-module.html',
})
export class AddModulePage {

  module: any = {};
  user:any;
  loading: any;

<<<<<<< HEAD
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: Configuration, public addModuleService: AddModuleService,public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
=======
  constructor(public navCtrl: NavController, public navParams: NavParams, public config: Configuration, public addModuleService: AddModuleService) {
>>>>>>> c1d74c56d10335fb9e585cf57b1675b8d8263d28
    this.user = this.config.getUser();
    console.log(this.user.user_Id);
  }

  sendModule(){
    if(this.module.name.trim().length > 1 && this.module.name.trim().length < 255) {
      this.presentLoadingDefault();
      this.module.user_id = this.user.user_Id;
      this.addModuleService.load(this.module)
        .then(data => {
          console.log(data);
          this.config.setModule(data);
          this.saveModulLocal(data._body);
          this.navCtrl.push(DeadlinesPage);
          this.loading.dismiss();
        });
    }else{
       this.presentToast();
       this.navCtrl.push(AddModulePage);
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Module name is required!',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }


  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      spinner: 'dots'
    });

    setTimeout(() => {
      this.loading.dismiss();
    }, 25000);
    this.loading.present();
  }

   saveModulLocal(body){
    this.config.setModule(JSON.parse(body));
  }
}
