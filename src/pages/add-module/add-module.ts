import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DeadlinesPage} from "../deadlines/deadlines";
import {Configuration} from "../../environments/configuration";
import {AddModuleService} from '../../providers/add-module';
import {MapModuleService} from "../../providers/mapModuleUser";


@Component({
    selector: 'page-add-module',
    templateUrl: 'add-module.html',
})
export class AddModulePage {

    module: any = {};
    user: any;
    loading: any;
    labels:any;


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public config: Configuration,
                public addModuleService: AddModuleService,
                public loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                public mapModuleService: MapModuleService) {
        this.user = this.config.getUser();
        this.labels = config.getLabels();
    }

    sendModule() {
        if (this.module.name.trim().length > 1 && this.module.name.trim().length < 255) {
            this.presentLoadingDefault();
            this.module.user_id = this.user.user_Id;
            this.addModuleService.load(this.module)
                .then(data => {
                    this.config.setModule(data);
                    this.saveModulLocal(data._body);
                    this.navCtrl.push(DeadlinesPage, {module:JSON.parse(data._body)});

                    this.mapModuleUser(data._body);

                    this.loading.dismiss();
                });
        } else {
            this.presentToast();
            this.navCtrl.push(AddModulePage);
        }
    }

    mapModuleUser(module) {
        this.mapModuleService.load(module, false)
            .then(data => {
                console.log(data);
        });
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: this.labels.MISTAKE_ADDMODULE,
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

    saveModulLocal(body) {
        this.config.setModule(JSON.parse(body));
    }
}
