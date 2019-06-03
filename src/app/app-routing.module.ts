import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  {
    path: "events",
    loadChildren: "./pages/events/events.module#EventsPageModule"
  },
  {
    path: "events/:id",
    loadChildren:
      "./pages/events-detail/events-detail.module#EventsDetailPageModule"
  },
  { path: "give", loadChildren: "./pages/give/give.module#GivePageModule" },
  {
    path: "sermons",
    loadChildren: "./pages/sermons/sermons.module#SermonsPageModule"
  },
  {
    path: "sermons/:seriesId",
    loadChildren:
      "./pages/sermons-series/sermons-series.module#SermonsSeriesPageModule"
  },
  {
    path: "sermons/:seriesId/:sermonId",
    loadChildren:
      "./pages/sermons-detail/sermons-detail.module#SermonsDetailPageModule"
  },
  {
    path: "lifegroups",
    loadChildren: "./pages/lifegroups/lifegroups.module#LifegroupsPageModule"
  },
  {
    path: "lifegroups/:id",
    loadChildren:
      "./pages/lifegroups-detail/lifegroups-detail.module#LifegroupsDetailPageModule"
  },
  {
    path: "times",
    loadChildren: "./pages/about/times/times.module#TimesPageModule"
  },
  {
    path: "parking",
    loadChildren: "./modals/parking/parking.module#ParkingPageModule"
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
