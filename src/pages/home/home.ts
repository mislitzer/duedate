import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {AddModulePage} from '../add-module/add-module'
import {ModuleDetail} from '../module-detail/module-detail'
import {Configuration} from "../../environments/configuration";
import {HomeService} from '../../providers/home';
import {RemoveUserModuleService} from "../../providers/removeModuleUser";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public user: any;
    public modules: Array<{name: string,description: string}>;
    labels:any;

    constructor(public navCtrl: NavController,
                public config: Configuration,
                public homeService: HomeService,
                public removeUserModuleService: RemoveUserModuleService,
                private toastCtrl: ToastController) {
        this.user = config.getUser();
        this.modules = [];
        this.labels = config.getLabels();
    }

    ionViewWillEnter() {
        this.getModule();
    }

    getModule() {
        this.homeService.load()
            .then(data => {
                let dataModules = JSON.parse(data._body);
                this.modules = dataModules;
                this.config.setMyModules(dataModules);
            });
    }

    removeModuleUser(module) {
        this.removeUserModuleService.load(module, true)
            .then(data => {
                this.presentToast(this.labels.MODULE_REMOVED);
                this.removeModuleOnList(module);
            });
    }

    removeModuleOnList(module:any) {
        for (let i = 0; i < this.modules.length; i++) {
            if (this.modules[i] == module) {
                this.modules.splice(i, 1);
            }
        }
    }

    presentToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
    }

    clicked(event) {
        this.navCtrl.push(AddModulePage);
    }

    goToDetail(module:any) {
        this.navCtrl.push(ModuleDetail, {module:module, showAdd:false});
    }
}
