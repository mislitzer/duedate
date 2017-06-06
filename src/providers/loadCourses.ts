import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import { Http } from '@angular/http';

@Injectable()
export class CoursesService {

  data: any;

  constructor(public http: Http, public config: Configuration) {
    this.data = null;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.config.getServiceBase() + "/courselist")
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.data = null;
        });
    });

  }

}