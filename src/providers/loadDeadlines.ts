import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import { Http } from '@angular/http';

@Injectable()
export class LoadDeadLinesService {

  data: any;

  constructor(public http: Http, public config: Configuration) {
    this.data = null;
  }

  load(course, module, isStudent) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.config.getServiceBase() + "/deadlineList/" + course + "/" + module + "/" + isStudent)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.data = null;
        });
    });

  }

}