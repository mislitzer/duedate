import { Component } from '@angular/core';

import { ReminderPage } from '../reminder/reminder';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ReminderPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
