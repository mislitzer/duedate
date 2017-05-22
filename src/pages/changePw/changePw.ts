import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Configuration} from "../../environments/configuration";
import {ChangePwService} from "../../providers/changePw";
import {SettingsPage} from "../settings/settings";

@Component({
  selector: 'page-changePw',
  templateUrl: 'changePw.html'
})
export class ChangePw {

  changePwForm: any = {
    password: "",
    new_password: "",
    confirm: ""
  };

  constructor(public navCtrl: NavController,
              public toastController: ToastController,
              public storage: Storage,
              public config: Configuration,
              public passwordService: ChangePwService) {
  }

  setNewPw() {
    if (this.checkInputFields())
      if (this.checkPasswordRequirements())
        this.setPw();
  }

  checkInputFields(): boolean {
    console.log(this.changePwForm.password);
    console.log(this.changePwForm.new_password);
    console.log(this.changePwForm.confirm);

    if (this.changePwForm.password && this.changePwForm.new_password && this.changePwForm.confirm) {
      return true;
    } else {
      this.showToast("Please fill out all input fields!", 3000, "bottom");
      return false;
    }
  }

  checkPasswordRequirements(): boolean {
    if (this.changePwForm.new_password.length >= 6) {
      if (this.changePwForm.new_password != this.changePwForm.confirm) {
        this.showToast("Password repeat is not correct!", 3000, "bottom");
        return false;
      }
      else {
        return true;

      }
    }
    else {
      this.showToast("Your password must have at least 6 characters", 3000, "bottom");
      return false;
    }
  }

  setPw() {
    this.passwordService.load(this.changePwForm)
      .then(data => {
        console.log('---');
        console.log(data);
        console.log('---');
        if (data && data != "null" && data._body) {
          this.showToast("Password changed", 3000, "bottom");
          this.saveUserLocal(data._body);
          this.navCtrl.pop(SettingsPage);
        }else {
          this.showToast("Password change failed - incorrect current Password", 3000, "bottom");
        }
      })
  }


  saveUserLocal(body) {
    this.storage.set('user', body);
    this.config.setUser(JSON.parse(body));
  }

  showToast(message: string, speed: number, position: string) {
    let toast = this.toastController.create({
      message: message,
      duration: speed,
      position: position
    });
    toast.present();
  }

}
