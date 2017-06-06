import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import { Http, Headers } from '@angular/http';

@Injectable()
export class MapModuleService {

  data: any;

  constructor(public http: Http, public config: Configuration) {
    this.data = null;
  }

  load(module, isJson) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    let moduleId;
    if (isJson) {
        moduleId = module.module_Id;
    }
    else {
        moduleId = JSON.parse(module).module_Id;
    }

    let userId = this.config.getUser().user_Id;

    return new Promise(resolve => {
      this.http.get(this.config.getServiceBase() + "/subscribeModule/" + userId + "/" + moduleId)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.data = null;
        });
    });

  }

}
