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

    labels:any;
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

        this.labels = this.config.getLabels();

    }

    setNewPw() {
        if (this.checkInputFields())
            if (this.checkPasswordRequirements())
                this.setPw();
    }

    checkInputFields(): boolean {
        if (this.changePwForm.password && this.changePwForm.new_password && this.changePwForm.confirm) {
            return true;
        } else {
            this.showToast(this.labels.REGISTER_VALID, 3000, "bottom");
            return false;
        }
    }

    checkPasswordRequirements(): boolean {
        if (this.changePwForm.new_password.length >= 6) {
            if (this.changePwForm.new_password != this.changePwForm.confirm) {
                this.showToast(this.labels.REGISTER_PWREPEAT, 3000, "bottom");
                return false;
            }
            else {
                return true;

            }
        }
        else {
            this.showToast(this.labels.REGISTER_ATLEAST, 3000, "bottom");
            return false;
        }
    }

    setPw() {
        this.passwordService.load(this.changePwForm)
            .then(data => {
                if (data && data != "null" && data._body && data._body.indexOf("nicht") == -1) {
                    this.showToast(this.labels.PW_CHANGED, 3000, "bottom");
                    this.saveUserLocal(data._body);
                    this.navCtrl.pop(SettingsPage);
                } else {
                    this.showToast(this.labels.PW_FAILED, 3000, "bottom");
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
