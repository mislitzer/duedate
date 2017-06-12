import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {DeadlinesService} from "../../providers/deadlines"
import {HomePage} from "../home/home"
import {CoursesService} from "../../providers/loadCourses";
import {ModuleDetail} from "../module-detail/module-detail";

@Component({
    selector: 'page-deadlines',
    templateUrl: 'deadlines.html',
})
export class DeadlinesPage {

    showList: boolean;
    deadline: any = {};
    editedDeadline:any = {};
    labels: any;
    loading: any;
    module: any;
    courses: any;
    time: any;
    date: any;
    minYear: any;
    maxYear: any;
    title: string;
    applyBtnText: string;
    edit: boolean = false;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loadingCtrl: LoadingController,
                public config: Configuration,
                public deadlineService: DeadlinesService,
                private toastCtrl: ToastController,
                public courseService: CoursesService) {

        this.labels = config.getLabels();
        this.module = this.navParams.get("module");
        let deadline = this.navParams.get("deadline");

        if (typeof deadline != "undefined") {
            this.title = this.labels.EDIT_DEADLINE;
            this.applyBtnText = this.labels.DEADLINE_SAVE;
            this.edit = true;
            this.editedDeadline = deadline;
            this.mapDeadlineValues(deadline);
        }
        else {
            this.applyBtnText = this.labels.DEADLINE_CREATE;
            this.title = this.labels.ADD_DEADLINE;
        }

        this.setMinMaxDate();
        this.loadCourses();
    }

    setMinMaxDate() {
        let d = new Date();
        this.minYear = d.getFullYear();
        this.maxYear = d.getFullYear() + 1;
    }

    mapDeadlineValues(deadline: any) {
        console.log(deadline);
        this.deadline.course = deadline.course;
        this.deadline.description = deadline.deadline_description;
        this.deadline.name = deadline.deadline_name;
        this.date = this.createDateString(deadline.deadlinetime);
        this.time = this.createTimeString(deadline.deadlinetime);
    }

    createDateString(timestamp: any) {
        let d = new Date(parseInt(timestamp));
        let m = d.getMonth() + 1;
        let year = d.getFullYear();
        let month = m < 10 ? "0" + m : m;
        let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        let fullString = year + "-" + month + "-" + day;

        return fullString;
    }

    createTimeString(timestamp: any) {
        let d = new Date(parseInt(timestamp));
        let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        let fullString = hours + ":" + minutes;

        return fullString;
    }

    sendDeadline() {
        let deadlineTime = new Date(this.date.year + "-" + this.date.month + "-" + this.date.day + " " + this.time.hour + ":" + this.time.minute + ":00");

        this.deadline.time = deadlineTime.getTime();

        if (this.deadline.name.trim().length > 1 && this.deadline.name.trim().length < 255) {
            this.presentLoadingDefault();

            if (this.edit) {
                this.deadlineService.load(this.deadline, this.module.module_Id, this.editedDeadline.deadline_id, true)
                    .then(data => {
                        console.log(data);
                        this.navCtrl.popToRoot(ModuleDetail);
                        this.loading.dismiss();
                    });
            }
            else {
                this.deadlineService.load(this.deadline, this.module.module_Id, 0, false)
                    .then(data => {
                        console.log(data);
                        this.navCtrl.popToRoot(ModuleDetail);
                        this.loading.dismiss();
                    });
            }
        } else {
            this.presentToast();
            this.navCtrl.push(DeadlinesPage);
        }
    }

    loadCourses() {
        this.courseService.load().then(data => {
            this.courses = JSON.parse(data._body);
            console.log(data._body);
        });
    }

    abort() {
        this.navCtrl.setRoot(HomePage);
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: this.labels.MISTAKE_ADDDEADLINES,
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
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
}
