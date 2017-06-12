import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import {Http, Headers} from '@angular/http';

@Injectable()
export class RemoveDeadlineService {

    data: any;

    constructor(public http: Http, public config: Configuration) {
        this.data = null;
    }

    load(deadLineId) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let deadline = "id=" + deadLineId;

        return new Promise(resolve => {
            this.http.post(this.config.getServiceBase() + "/deleteDeadline", deadline, {
                headers: headers
            })
                .map(res => res)
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                    this.data = null;
                });
        });

    }

}
