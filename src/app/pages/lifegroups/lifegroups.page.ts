import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { LifegroupsService } from "../../services/lifegroups.service";
import { Observable } from "rxjs";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-lifegroups",
  templateUrl: "./lifegroups.page.html",
  styleUrls: ["./lifegroups.page.scss"]
})
export class LifegroupsPage implements OnInit {
  faHome = faHome;
  groups: Observable<any>;

  constructor(
    public api: LifegroupsService,
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
        this.groups = res;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }
}
