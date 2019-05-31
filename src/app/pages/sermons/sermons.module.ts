import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { SermonsPage } from "./sermons.page";

const routes: Routes = [
  {
    path: "",
    component: SermonsPage
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
  declarations: [SermonsPage]
})
export class SermonsPageModule {}
