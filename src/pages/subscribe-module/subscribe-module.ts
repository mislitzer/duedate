import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {DeadlinesPage} from "../deadlines/deadlines";
import {Configuration} from "../../environments/configuration";
import {AddModuleService} from '../../providers/add-module';
import {MapModuleService} from "../../providers/mapModuleUser";
import {SearchModuleService} from "../../providers/searchModules";
import {RemoveUserModuleService} from "../../providers/removeModuleUser";
import {ModuleDetail} from "../module-detail/module-detail";


@Component({
    selector: 'page-subscribe-module',
    templateUrl: 'subscribe-module.html',
})
export class SubscribeModulePage {

    module: any = {};
    user: any;
    loading: any;
    labels:any;
    search:string;
    foundModules:any = [];
    alreadySubscribedModules:any = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public config: Configuration,
                public loadingCtrl: LoadingController,
                public searchModule: SearchModuleService) {

        this.user = this.config.getUser();
        this.labels = config.getLabels();

        this.search = navParams.get("search");
        this.searchForModules();

        this.mapExistingModuleIds();
    }

    showModuleDetail(module) {
        this.navCtrl.push(ModuleDetail, {module: module, showAdd:true});
    }

    mapExistingModuleIds() {
        let existing = this.config.getMyModules();

        let that = this;
        existing.forEach(function(mod) {
            that.alreadySubscribedModules.push(mod.module_Id);
        });
    }

    searchForModules() {
        this.searchModule.load(this.search)
            .then(data => {
                let found = JSON.parse(data._body);
                let that = this;
                found.forEach(function(mod) {
                    if (that.alreadySubscribedModules.indexOf(mod.module_Id) == -1) {
                        that.foundModules.push(mod);
                    }
                });
            });
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

    closePage() {
        this.navCtrl.pop();
    }
}
