import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Configuration} from "../../environments/configuration"
import {DeadlinesPage} from "../deadlines/deadlines"
import {MapModuleService} from "../../providers/mapModuleUser";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";
import {LoadDeadLinesService} from "../../providers/loadDeadlines";

@Component({
    selector: 'page-module-detail',
    templateUrl: 'module-detail.html',
})
export class ModuleDetail {

    module: any = {};
    labels:any;
    showAdd:boolean;
    public user: any;
    public deadlines: Array<{name: string,description: string,date: Date}>;
    course:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public config: Configuration,
                public mapModuleService: MapModuleService,
                private toastCtrl: ToastController,
                public storage: Storage,
                public deadlineService: LoadDeadLinesService) {

        this.labels = config.getLabels();
        this.module = this.navParams.get("module");
        this.showAdd = this.navParams.get("showAdd");
        this.user = config.getUser();

        storage.get('settingCourse').then((val) => {
            if (typeof val != "undefined" && val != null) {
                this.course = val;
            }
            this.loadDeadlines();
        });

        this.deadlines = [
            {
                name: "Blabla",
                description: "Assignment einreichen",
                date: new Date("February 4, 2016 10:13:00")
            },
            {
                name: "Blabla",
                description: "Assignment einreichen",
                date: new Date("February 4, 2016 10:13:00")
            }
        ]

    }

    mapModuleUser() {
        this.mapModuleService.load(this.module, true)
            .then(data => {
                this.presentToast(this.labels.MODULE_ADDED);
                this.navCtrl.popToRoot(HomePage);
            });
    }

    presentToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
    }

    loadDeadlines() {
        this.deadlineService.load(this.course, this.module.module_Id, 1).then(data => {
            this.deadlines = JSON.parse(data._body);
            console.log(this.deadlines);
        });
    }

    addDeadline(event, module) {
        console.log(module);
        this.navCtrl.push(DeadlinesPage, {module: this.module});
    }

}
