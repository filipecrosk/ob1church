import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-times',
  templateUrl: './times.page.html',
  styleUrls: ['./times.page.scss'],
})
export class TimesPage implements OnInit {
  faHome = faHome;

  constructor(public platform: Platform) { }

  ngOnInit() {
    console.log('platform', this.platform.is('ios'));
  }

  public isAndroid = this.platform.is('android');
  public isIos = this.platform.is('ios');
}
