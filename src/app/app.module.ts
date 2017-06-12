import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {DueDate} from './app.component';

import {ReminderPage} from '../pages/reminder/reminder';
import {SettingsPage} from '../pages/settings/settings';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {Register} from "../pages/register/register";
import {ModuleDetail} from "../pages/module-detail/module-detail";
import {Start} from "../pages/start/start";
import {ChangePw} from "../pages/changePw/changePw";

import {Configuration} from "../environments/configuration";
import {RegisterService} from "../providers/register";


import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateStaticLoader, TranslateLoader} from "ng2-translate";

import {AddModulePage} from "../pages/add-module/add-module";

import {DeadlinesPage} from "../pages/deadlines/deadlines";
import {AddReminderPage} from "../pages/add-reminder/add-reminder";

import {LoginService} from "../providers/login";
import {IonicStorageModule} from "@ionic/storage";

import {AddModuleService} from "../providers/add-module";
import {HomeService} from "../providers/home";
import {DuedateHelpers} from "../environments/helpers";
import {ChangePwService} from "../providers/changePw";
import {DeadlinesService} from "../providers/deadlines";
import {MapModuleService} from "../providers/mapModuleUser";
import {SearchModuleService} from "../providers/searchModules";
import {SearchPage} from "../pages/search/search";
import {SubscribeModulePage} from "../pages/subscribe-module/subscribe-module";
import {RemoveUserModuleService} from "../providers/removeModuleUser";
import {CoursesService} from "../providers/loadCourses";
import {LoadDeadLinesService} from "../providers/loadDeadlines";
import {RemoveDeadlineService} from "../providers/removeDeadline";
import {DeadlineDetail} from "../pages/deadline-detail/deadline-detail";

export function HttpLoaderFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/lang', '.json');
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
        ChangePw,
        SearchPage,
        SubscribeModulePage,
        DeadlineDetail,
        AddReminderPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (HttpLoaderFactory),
            deps: [Http]
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
        DeadlineDetail,
        AddModulePage,
        DeadlinesPage,
        Start,
        ChangePw,
        SearchPage,
        SubscribeModulePage,
        AddReminderPage
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
        DeadlinesService,
        MapModuleService,
        SearchModuleService,
        RemoveUserModuleService,
        CoursesService,
        LoadDeadLinesService,
        RemoveDeadlineService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
