import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {Start} from "../start/start";
import {Storage} from "@ionic/storage";
import {ChangePw} from  "../changePw/changePw";

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    public user;

    constructor(public navCtrl: NavController, public config: Configuration, public storage: Storage, private _app: App) {
        this.user = config.getUser();
    }

    changePassword():void{
      this.navCtrl.push(ChangePw);
    }

    logoutUser():void {
        //Local Storage und Globales User Objekt entfernen
        this.storage.set("user", null);
        this.config.setUser(null);

        //User auf Home weiterleiten
        this._app.getRootNav().setRoot(Start);
    }
}

