import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'events', loadChildren: './events/events.module#EventsPageModule' },
  { path: 'events-detail', loadChildren: './events-detail/events-detail.module#EventsDetailPageModule' },
  { path: 'give', loadChildren: './give/give.module#GivePageModule' },
  { path: 'lifegroups', loadChildren: './lifegroups/lifegroups.module#LifegroupsPageModule' },
  { path: 'sermons', loadChildren: './sermons/sermons.module#SermonsPageModule' },
  { path: 'sermons-series', loadChildren: './sermons-series/sermons-series.module#SermonsSeriesPageModule' },
  { path: 'sermons-detail', loadChildren: './sermons-detail/sermons-detail.module#SermonsDetailPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
