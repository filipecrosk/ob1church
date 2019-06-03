import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { LifegroupsDetailPage } from "./lifegroups-detail.page";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  {
    path: "",
    component: LifegroupsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ],
  declarations: [LifegroupsDetailPage]
})
export class LifegroupsDetailPageModule {}
