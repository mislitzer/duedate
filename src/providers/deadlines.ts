import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import {Http, Headers} from '@angular/http';

@Injectable()
export class DeadlinesService {

    data: any;

    constructor(public http: Http, public config: Configuration) {
        this.data = null;
    }

    load(params, moduleId, deadlineId, edit) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let posts = "";
        for (let key in params) {
            if (key != "") {
                if (edit) {
                    if (key != "course") {
                        posts += "&" + key + "=" + params[key];
                    }
                }
                else {
                    posts += "&" + key + "=" + params[key];
                }
            }
        }

        posts = posts.replace("&", "");

        let service = "/deadline";
        if (edit) {
            service = "/changeDeadline";
            posts += "&id=" + deadlineId;
        }
        else {
            posts += "&moduleId=" + moduleId;
        }

        console.log(posts);

        return new Promise(resolve => {
            this.http.post(this.config.getServiceBase() + service, posts, {
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
