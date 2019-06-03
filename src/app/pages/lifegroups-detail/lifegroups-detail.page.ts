import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { LifegroupsService } from "../../services/lifegroups.service";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-lifegroups-detail",
  templateUrl: "./lifegroups-detail.page.html",
  styleUrls: ["./lifegroups-detail.page.scss"]
})
export class LifegroupsDetailPage implements OnInit {
  faHome = faHome;

  groupId: string;
  group = null;

  constructor(
    public api: LifegroupsService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get("id");
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });

    await loading.present();
    this.api.getOne(this.groupId).subscribe(
      res => {
        this.group = res;
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }

  share() {
    this.socialSharing
      .share(
        "Hey, come to our life group",
        null,
        "img/share.jpg",
        this.group.link
      ) // Share via native share sheet
      .then(
        function(result) {
          console.log("log - sharing success", result);
          // Success!
        },
        function(err) {
          console.log("log - sharing error", err);
          // An error occured. Show a message to the user
        }
      );
  }
}
