import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SermonsSeriesPage } from './sermons-series.page';

const routes: Routes = [
  {
    path: '',
    component: SermonsSeriesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SermonsSeriesPage]
})
export class SermonsSeriesPageModule {}
