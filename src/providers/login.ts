import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import {Http, Headers} from '@angular/http';
import {DuedateHelpers} from "../environments/helpers";


/*
 Generated class for the Login provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LoginService {

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
            if (key != "") {
                if (key == "password") {
                    posts += "&" + key + "=" + this.helpers.generatePasswordHash(params[key]);
                }
                else {
                    posts += "&" + key + "=" + params[key];
                }
            }
        }

        posts = posts.replace("&", "");
        console.log(posts);

        return new Promise(resolve => {
            this.http.post(this.config.getServiceBase() + "/login", posts, {
                headers: headers
            })
                .map(res => res)
                .subscribe(data => {
                    //Data return
                    this.data = data;
                    resolve(this.data);
                    this.data = null;
                });
        });

    }

}
