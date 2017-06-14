
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Configuration} from "../environments/configuration";
import { Http, Headers } from '@angular/http';


@Injectable()
export class AddReminderService {

  data: any;

  constructor(public http: Http, public config: Configuration) {
    this.data = null;
  }

  /* TO BE DONE */

  load(params) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let posts = "";
    for (let key in params) {
      if (key != "" ){
        posts += "&" + key + "=" + params[key];

      }
    }

    posts = posts.replace("&", "");


    console.log(posts);

    return new Promise(resolve => {
      this.http.post(this.config.getServiceBase() + "/reminder", posts, {
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

  loadReminders(userId, deadlineId){
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.config.getServiceBase() + "/reminderList/" + userId + "/" + deadlineId)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
          this.data = null;
        });
    });
  }

  deleteReminder(reminderId){
    if (this.data) {
      return Promise.resolve(this.data);
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let reminder = "id=" + reminderId;

    return new Promise(resolve => {
      this.http.post(this.config.getServiceBase() + "/deleteReminder", reminder, {
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
