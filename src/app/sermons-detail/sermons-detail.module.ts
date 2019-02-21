import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SermonsDetailPage } from './sermons-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SermonsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SermonsDetailPage]
})
export class SermonsDetailPageModule {}
