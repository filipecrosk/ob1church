import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { EventsService } from "../../services/events.service";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-events-detail",
  templateUrl: "./events-detail.page.html",
  styleUrls: ["./events-detail.page.scss"]
})
export class EventsDetailPage implements OnInit {
  faHome = faHome;

  eventId: string;
  event = null;

  constructor(
    public api: EventsService,
    public loadingController: LoadingController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get("id");
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    this.api.getOne(this.eventId).subscribe(
      res => {
        this.event = res;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }
}
