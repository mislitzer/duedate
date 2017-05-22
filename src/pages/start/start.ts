import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {Register} from "../register/register";
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";
import {Configuration} from "../../environments/configuration";


@Component({
    selector: 'page-start',
    templateUrl: 'start.html',
})
export class Start {

    constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage, public config: Configuration) {

        storage.get('user').then((val) => {
            if (val != null) {
                this.config.setUser(JSON.parse(val));
                this.navCtrl.setRoot(TabsPage);
            }

        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Start');
    }

    openLogin() {
        this.navCtrl.push(LoginPage);
    }

    openRegister() {
        this.navCtrl.push(Register);
    }

}
