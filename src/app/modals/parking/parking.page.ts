import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams, Platform } from "@ionic/angular";

@Component({
  selector: "app-parking",
  templateUrl: "./parking.page.html",
  styleUrls: ["./parking.page.scss"]
})
export class ParkingPage implements OnInit {
  myParameter: boolean;
  myOtherParameter: Date;

  public isAndroid = this.platform.is("android");
  public isIos = this.platform.is("ios");

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public platform: Platform
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.myParameter = this.navParams.get("aParameter");
    this.myOtherParameter = this.navParams.get("otherParameter");
  }

  async myDismiss() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
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
}
