import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DueDate } from './app.component';

import { ReminderPage } from '../pages/reminder/reminder';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AddModulePage} from "../pages/add-module/add-module";

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    DueDate,
    ReminderPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddModulePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
    IonicModule.forRoot(DueDate)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DueDate,
    ReminderPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddModulePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
