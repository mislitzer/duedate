import {Component} from '@angular/core';
import {NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {RegisterService} from "../../providers/register";
import {Configuration} from "../../environments/configuration";

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class Register {

    register: any = {};
    loading:any;
    labels:any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastController: ToastController,
                public registerService: RegisterService,
                public config: Configuration,
                public loadingCtrl: LoadingController) {

        this.labels = this.config.getLabels();

    }

    registerUser() {
        if (this.register.email && this.register.name && this.register.password && this.register.passwordrpt && this.emailCheck()) {
            if (this.register.password.length >= 6) {
                if (this.register.password != this.register.passwordrpt) {
                    this.showToast(this.labels.REGISTER_PWREPEAT, 3000, "bottom");
                }
                else {
                    this.registerUserRequest();
                }
            }
            else {
                this.showToast(this.labels.REGISTER_ATLEAST, 3000, "bottom");
            }
        }
        else {
            this.showToast(this.labels.REGISTER_VALIDMAIL, 3000, "bottom");
        }

    }

    showToast(message: string, speed: number, position: string) {
        let toast = this.toastController.create({
            message: message,
            duration: speed,
            position: position
        });
        toast.present();
    }

    registerUserRequest() {
        this.roleDivider();
        this.presentLoadingDefault();

        this.registerService.load(this.register)
            .then(data => {
                if (data && data != null) {
                    this.loading.dismiss();
                    this.showToast(this.labels.REGISTER_VERIFY, 6000, "bottom");
                    this.navCtrl.popToRoot();
                }
            })

    }

    emailCheck() {
        let pattern = new RegExp('^[A-Za-z0-9._%+-]+@hr.nl$');
        let check = pattern.test(this.register.email);

        return check;
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

    roleDivider() {
        let pattern = new RegExp('^[0-9]+@hr.nl$');

        if (pattern.test(this.register.email)) {
            this.register.isStudent = true;
        }
        else {
            this.register.isStudent = false;
        }
    }

}