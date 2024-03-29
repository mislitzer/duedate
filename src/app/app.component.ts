import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from 'ng2-translate';

import {Start} from "../pages/start/start";
import {Configuration} from "../environments/configuration";


@Component({
  templateUrl: 'app.html'
})
export class DueDate {
  rootPage:any = Start;

  constructor(platform:Platform, statusBar:StatusBar, splashScreen:SplashScreen, translate:TranslateService, public config:Configuration) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      //Set language
      let language:any = navigator.language;

      if (language != "nl" || language != "en") {
        language = "en";
      }

      translate.setDefaultLang(language);
      translate.use(language);

      translate.get('GENERAL').subscribe((res:string) => {
        config.setLabels(res);
      });
    });
  }
}
