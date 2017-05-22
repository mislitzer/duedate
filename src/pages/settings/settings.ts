import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {Start} from "../start/start";
import {Storage} from "@ionic/storage";

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    public user;

    constructor(public navCtrl: NavController, public config: Configuration, public storage: Storage) {
        this.user = config.getUser();
    }

    logoutUser():void {
        //Local Storage und Globales User Objekt entfernen
        this.storage.set("user", null);
        this.config.setUser(null);

        //User auf Home weiterleiten
        this.navCtrl.setRoot(Start);
    }
}
