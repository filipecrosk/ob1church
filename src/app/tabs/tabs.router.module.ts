import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'sermons',
        children: [
          {
            path: '',
            loadChildren: '../sermons/sermons.module#SermonsPageModule'
          }
        ]
      },
      {
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: '../events/events.module#EventsPageModule'
          },
          {
            path: ':id',
            loadChildren: '../events-detail/events-detail.module#EventsDetailPageModule'
          }
        ]
      },
      {
        path: 'give',
        children: [
          {
            path: '',
            loadChildren: '../give/give.module#GivePageModule'
          }
        ]
      },
      {
        path: 'lifegroups',
        children: [
          {
            path: '',
            loadChildren: '../lifegroups/lifegroups.module#LifegroupsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/sermons',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
