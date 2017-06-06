import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Configuration} from "../../environments/configuration";
import {SubscribeModulePage} from "../subscribe-module/subscribe-module";

@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {

    public user: any;
    search: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private config: Configuration) {
        this.user = config.getUser();
    }

    searchModules() {
        this.navCtrl.push(
            SubscribeModulePage,
            {
                search: this.search
            }
        );
    }

}
