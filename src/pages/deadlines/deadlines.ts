import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Deadlines page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-deadlines',
  templateUrl: 'deadlines.html',
})
export class DeadlinesPage {

  showList: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  autoCompleteClass(input){
    this.showList = true;

    let val = input.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      //todo: liste für class vorschläge
    }
    else {
      //todo: wenn keine eingabe gemacht wurde
    }
  }

}
