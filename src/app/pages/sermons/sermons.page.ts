import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { SermonsService } from "../../services/sermons.service";
import { Observable } from "rxjs";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sermons",
  templateUrl: "./sermons.page.html",
  styleUrls: ["./sermons.page.scss"]
})
export class SermonsPage implements OnInit {
  faHome = faHome;
  series: Observable<any>;

  constructor(
    public api: SermonsService,
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
        this.series = res;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }

  doRefresh(event) {
    this.api.getAll().subscribe(
      res => {
        this.series = res;
        event.target.complete();
      },
      err => {
        event.target.complete();
      }
    );
  }
}
