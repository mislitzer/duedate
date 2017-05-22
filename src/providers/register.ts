import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import {DuedateHelpers} from "../environments/helpers";

@Injectable()
export class RegisterService {
    data: any;

    constructor(public http: Http, public config: Configuration, public helpers: DuedateHelpers) {
        this.data = null;
    }

    load(params) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let posts = "";
        for (let key in params) {
            if (key != "" && key != "passwordrpt") {
                if (key == "password") {
                    posts += "&" + key + "=" + this.helpers.generatePasswordHash(params[key]);
                }
                else {
                    posts += "&" + key + "=" + params[key];
                }
            }
        }

        posts = posts.replace("&", "");

        return new Promise(resolve => {
            this.http.post(this.config.getServiceBase() + "/user", posts, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(data => {
                //Data return
                this.data = data;
                resolve(this.data);
                this.data = null;
            });
        });

    }

}