import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Configuration {
    private _user:any;
    private _serviceBase:string = "http://localhost:9000";
    private _module:any;

    setModule(data){
      this._module = data;
    }

    getModule(){
      return this._module;
    }

    setUser(data) {
        this._user = data;
    }

    getUser() {
        return this._user;
    }

    setServiceBase(data) {
        this._serviceBase = data;
    }

    getServiceBase() {
        return this._serviceBase;
    }
}
