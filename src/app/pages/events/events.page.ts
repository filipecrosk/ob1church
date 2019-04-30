import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { EventsService } from "../../services/events.service";
import { Observable } from "rxjs";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-events",
  templateUrl: "./events.page.html",
  styleUrls: ["./events.page.scss"]
})
export class EventsPage implements OnInit {
  faHome = faHome;
  events: Observable<any>;

  constructor(
    public api: EventsService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    this.api.getAll().subscribe(
      res => {
        this.events = res;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }
}
