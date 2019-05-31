import { Component, OnInit } from "@angular/core";
import {
  faHome,
  faExternalLinkAlt,
  faBan
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-give",
  templateUrl: "./give.page.html",
  styleUrls: ["./give.page.scss"]
})
export class GivePage implements OnInit {
  faHome = faHome;
  faExternalLinkAlt = faExternalLinkAlt;
  faBan = faBan;

  constructor() {}

  ngOnInit() {}
}
