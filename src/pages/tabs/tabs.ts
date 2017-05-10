import { Component } from '@angular/core';

import { ReminderPage } from '../reminder/reminder';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import {Configuration} from "../../environments/configuration";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public user:any;

  tab1Root = HomePage;
  tab2Root = ReminderPage;
  tab3Root = SettingsPage;

  constructor(public config: Configuration) {
    this.user = config.getUser();
    console.log(this.user);
  }
}
