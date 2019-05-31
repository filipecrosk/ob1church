import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { SermonsService } from "../../services/sermons.service";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sermons-series",
  templateUrl: "./sermons-series.page.html",
  styleUrls: ["./sermons-series.page.scss"]
})
export class SermonsSeriesPage implements OnInit {
  faHome = faHome;

  seriesId: string;
  series = null;
  sermons = null;

  constructor(
    public api: SermonsService,
    public loadingController: LoadingController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.seriesId = this.route.snapshot.paramMap.get("seriesId");
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    this.api.getOne(this.seriesId).subscribe(
      (res: any) => {
        this.series = res;
        this.sermons = res.sermons;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }
}
