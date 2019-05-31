import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { SermonsService } from "../../services/sermons.service";
import { faHome } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sermons-detail",
  templateUrl: "./sermons-detail.page.html",
  styleUrls: ["./sermons-detail.page.scss"]
})
export class SermonsDetailPage implements OnInit {
  faHome = faHome;

  seriesId: string;
  sermonId: string;
  sermon = null;
  showStudy = false;
  showAudioPlayer = false;
  trustedVideoUrl: SafeResourceUrl;

  constructor(
    public api: SermonsService,
    public loadingController: LoadingController,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.seriesId = this.route.snapshot.paramMap.get("seriesId");
    this.sermonId = this.route.snapshot.paramMap.get("sermonId");
    this.getData();
  }

  async getData() {
    const loading = await this.loadingController.create({
      message: "Loading"
    });
    await loading.present();
    this.api.getSermon(this.sermonId).subscribe(
      (res: any) => {
        this.sermon = res;
        this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          res.video.replace("watch?v=", "embed/")
        );
        loading.dismiss();
      },
      err => {
        loading.dismiss();
      }
    );
  }

  showQuestions() {
    this.showStudy = !this.showStudy;
  }
  showContent() {
    this.showStudy = !this.showStudy;
  }
  showPlayer() {
    this.showAudioPlayer = !this.showAudioPlayer;
  }

  share() {
    // $cordovaSocialSharing
    //   .share('Hey, take a look at this sermon', '', 'img/share.jpg', $scope.sermon.link) // Share via native share sheet
    //   .then(function(result) {
    //     console.log('log - sharing success', result);
    //     // Success!
    //   }, function(err) {
    //     console.log('log - sharing error', err);
    //     // An error occured. Show a message to the user
    //   });
  }
}
