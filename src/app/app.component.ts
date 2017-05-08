import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';

import {Start} from "../pages/start/start";


@Component({
  templateUrl: 'app.html'
})
export class DueDate {
  rootPage:any = Start;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      //Sprache setzen
      translate.setDefaultLang('en');
      translate.use('en');


    });
  }
}
