import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Configuration} from "../../environments/configuration"
import {DeadlinesPage} from "../deadlines/deadlines"
import {MapModuleService} from "../../providers/mapModuleUser";
import {HomePage} from "../home/home";
import {Storage} from "@ionic/storage";
import {LoadDeadLinesService} from "../../providers/loadDeadlines";
import {RemoveDeadlineService} from "../../providers/removeDeadline";
import {DeadlineDetail} from "../deadline-detail/deadline-detail";

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
                public deadlineService: LoadDeadLinesService,
                public removeDeadlineService: RemoveDeadlineService) {

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
        let isStudent = 1;
        if (typeof this.course == "undefined" || !this.user.student) {
            isStudent = 0;
        }
        this.deadlineService.load(this.course, this.module.module_Id, isStudent).then(data => {
            if (data._body.indexOf("Keine Deadlines") == -1) {
                this.deadlines = JSON.parse(data._body);
            }
            else {
                this.deadlines = null;
            }
        });
    }

    addDeadline(event, module) {
        this.navCtrl.push(DeadlinesPage, {module: this.module});
    }

    removeDeadline(deadline) {
        this.removeDeadlineService.load(deadline.deadline_id).then(data => {
            this.presentToast(this.labels.DEADLINE_REMOVED);
            this.removeDeadlineOnList(deadline);
        });
    }

    removeDeadlineOnList(deadline:any) {
        for (let i = 0; i < this.deadlines.length; i++) {
            if (this.deadlines[i] == deadline) {
                this.deadlines.splice(i, 1);
            }
        }
    }

    goToDetail(deadline:any){
      if (this.user.student) {
          this.navCtrl.push(DeadlineDetail, {deadline: deadline});
      }
      else {
          this.navCtrl.push(DeadlinesPage, {module: this.module, deadline: deadline});
      }
    }


}
