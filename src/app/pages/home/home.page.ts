import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { EventsService } from "../../services/events.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
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
