import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-events-detail',
  templateUrl: './events-detail.page.html',
  styleUrls: ['./events-detail.page.scss'],
})
export class EventsDetailPage implements OnInit {
  faHome = faHome;

  constructor() { }

  ngOnInit() {
  }

}
