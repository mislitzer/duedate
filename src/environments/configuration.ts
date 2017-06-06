import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class Configuration {
    private _user:any;
    private _serviceBase:string = "http://duedate.web.fh-kufstein.ac.at";
    //private _serviceBase:string = "http://5df10b8d.ngrok.io";
    private _module:any;
    private _labels:any;
    private _myModules:any;

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

    getLabels() {
        return this._labels;
    }

    setLabels(data) {
        this._labels = data;
    }

    getMyModules() {
        return this._myModules;
    }

    setMyModules(data) {
        this._myModules = data;
    }
}
