import { Component, OnInit } from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ParkingPage } from "../../../modals/parking/parking.page";

@Component({
  selector: "app-times",
  templateUrl: "./times.page.html",
  styleUrls: ["./times.page.scss"]
})
export class TimesPage implements OnInit {
  faHome = faHome;

  constructor(
    public modalController: ModalController,
    public platform: Platform,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit() {
    console.log("platform", this.platform.is("ios"));
  }

  public isAndroid = this.platform.is("android");
  public isIos = this.platform.is("ios");

  async openModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ParkingPage,
      componentProps: {
        aParameter: true,
        otherParameter: new Date()
      }
    });

    modal.onDidDismiss().then(detail => {
      if (detail !== null) {
        console.log("The result:", detail.data);
      }
    });

    await modal.present();
  }

  // openIosMap is for open IOS Map application.
  openIosMap(targetDestinationLocation) {
    window.open("maps://?q=32.745549,-117.246724", "_system");
  }

  openGoogleMap(targetDestinationLocation) {
    window.open("comgooglemaps://?q=32.745549,-117.246724&zoom=15", "_system");
  }

  openAndroidMap(targetDestinationLocation) {
    window.open("geo://32.745549,-117.246724?q=ob1church&zoom=15", "_system");
  }

  share() {
    this.socialSharing
      .share(
        "Hey, come visit us at 4790 Santa Monica, Ocean Beach. Learn more",
        "",
        "img/share.jpg",
        "http://ob1church.com"
      ) // Share via native share sheet
      .then(
        function(result) {
          // console.log('log - sharing success', result);
          // Success!
        },
        function(err) {
          // console.log('log - sharing error', err);
          // An error occured. Show a message to the user
        }
      );
  }
}
