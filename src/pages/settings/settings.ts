import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {Start} from "../start/start";
import {Storage} from "@ionic/storage";
import {ChangePw} from  "../changePw/changePw";
import {CoursesService} from "../../providers/loadCourses";

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {

    public user;
    courses:any;

    course:any;
    alerts:any;

    constructor(public navCtrl: NavController, public config: Configuration, public storage: Storage, private _app: App, public courseService: CoursesService) {
        this.user = config.getUser();

        storage.get('settingAlert').then((val) => {
            if (val != null) {
                this.alerts = val;
            }
            else {
                this.alerts = false;
            }
            console.log(this.alerts);
        });

        storage.get('settingCourse').then((val) => {
            if (val != null) {
                this.course = val;
            }

            console.log(this.course);
        });

        this.loadCourses();
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

    loadCourses() {
        this.courseService.load().then(data => {
            this.courses = JSON.parse(data._body);
            console.log(data._body);
        });
    }

    saveSettingsAlerts() {
        this.storage.set("settingAlert", this.alerts);
    }

    saveSettingsCourse() {
        console.log(this.course);
        this.storage.set("settingCourse", this.course);
    }
}

