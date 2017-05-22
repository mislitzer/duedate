import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { DueDate } from './app.component';

import { ReminderPage } from '../pages/reminder/reminder';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Register } from "../pages/register/register";
import { ModuleDetail } from "../pages/module-detail/module-detail";
import { Start } from "../pages/start/start";
import { ChangePw } from "../pages/changePw/changePw";

import {Configuration} from "../environments/configuration";
import {RegisterService} from "../providers/register";


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AddModulePage} from "../pages/add-module/add-module";

import {DeadlinesPage} from "../pages/deadlines/deadlines";

import {LoginService} from "../providers/login";
import {IonicStorageModule} from "@ionic/storage";

import {AddModuleService} from "../providers/add-module";
import {HomeService} from "../providers/home";
import {DuedateHelpers} from "../environments/helpers";
import {ChangePwService} from "../providers/changePw";

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
    Register,
    ModuleDetail,
    AddModulePage,
    DeadlinesPage,
    Start,
    ChangePw
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
    IonicModule.forRoot(DueDate),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DueDate,
    ReminderPage,
    SettingsPage,
    HomePage,
    TabsPage,
    LoginPage,
    Register,
    ModuleDetail,
    AddModulePage,
    DeadlinesPage,
    Start,
    ChangePw
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RegisterService,
    Configuration,
    LoginService,
    AddModuleService,
    HomeService,
    DuedateHelpers,
    ChangePwService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
