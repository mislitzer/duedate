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
    labels: any;
    loading: any;
    module: any;
    courses:any;
    time:any;
    date:any;
    minYear:any;
    maxYear:any;

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
        console.log(deadline);

        this.setMinMaxDate();
        this.loadCourses();
    }

    setMinMaxDate() {
        let d = new Date();
        this.minYear = d.getFullYear();
        this.maxYear = d.getFullYear() + 1;
    }

    mapDeadlineValues(deadline:any) {
        /*course
            :
            "4"
        deadline_description
            :
            "asdf"
        deadline_id
            :
            13
        deadline_name
            :
            "asdf"
        deadlinetime
            :
            "1514851200000"
        module
            :
            "11"

        this.deadline = deadline.course;
        this.deadline = deadline.*/
    }

    sendDeadline() {
      let deadlineTime = new Date(this.date.year + "-" + this.date.month + "-" + this.date.day + " " + this.time.hour + ":" + this.time.minute + ":00");

      this.deadline.time = deadlineTime.getTime();

      if (this.deadline.name.trim().length > 1 && this.deadline.name.trim().length < 255) {
          this.presentLoadingDefault();

          this.deadlineService.load(this.deadline, this.module.module_Id)
              .then(data => {
                  console.log(data);
                  this.navCtrl.popToRoot(ModuleDetail);
                  this.loading.dismiss();
              });
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
