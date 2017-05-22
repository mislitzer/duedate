import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterService} from "../../providers/register";

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class Register {

    register: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public toastController: ToastController,
                public registerService: RegisterService) {
    }

    registerUser() {
        if (this.register.email && this.register.name && this.register.password && this.register.passwordrpt && this.emailCheck()) {
            if (this.register.password.length >= 6) {
                if (this.register.password != this.register.passwordrpt) {
                    this.showToast("Password repeat is not correct!", 3000, "bottom");
                }
                else {
                    this.registerUserRequest();
                }
            }
            else {
                this.showToast("Your password must have at least 6 characters", 3000, "bottom");
            }
        }
        else {
            this.showToast("Please fill in all input fields and type in a valid mail address!", 3000, "bottom");
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
        console.log(this.register);

        this.registerService.load(this.register)
            .then(data => {
                console.log(data);
                if (data && data != null) {
                    this.showToast("Thank you! Please look at your mail inbox to verify your register process!", 6000, "middle");
                    this.navCtrl.popToRoot();
                }
            })

    }

    emailCheck() {
        let pattern = new RegExp('^[A-Za-z0-9._%+-]+@hr.nl$');
        let check = pattern.test(this.register.email);

        return check;
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
