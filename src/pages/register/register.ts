import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterService} from "../../providers/register";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  register:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastController: ToastController,
              public registerService: RegisterService) {
  }

  registerUser() {
    if (this.register.email && this.register.name && this.register.password && this.register.passwordrpt) {
      if (this.register.password != this.register.passwordrpt) {
        this.showToast("Password repeat is not correct!");
      }
      else {
        this.registerUserRequest();
      }
    }
    else {
      this.showToast("Please fill in all input fields!");
    }

  }

  showToast(message: string) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  registerUserRequest() {
      this.registerService.load(this.register)
          .then(data => {
              console.log(data);
          })
  }

}
