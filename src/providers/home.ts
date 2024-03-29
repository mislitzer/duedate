import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import { Http, Headers } from '@angular/http';

@Injectable()
export class HomeService {

  data: any;

  constructor(public http: Http, public config: Configuration) {
    this.data = null;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    let userId = this.config.getUser().user_Id;

    return new Promise(resolve => {
      this.http.get(this.config.getServiceBase() + "/modulelist/" + userId)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.data = null;
        });
    });

  }
}
