import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: "../pages/home/home.module#HomePageModule"
          }
        ]
      },
      {
        path: "sermons",
        children: [
          {
            path: "",
            loadChildren: "../pages/sermons/sermons.module#SermonsPageModule"
          },
          {
            path: ":seriesId",
            loadChildren:
              "../pages/sermons-series/sermons-series.module#SermonsSeriesPageModule"
          },
          {
            path: ":seriesId/:sermonId",
            loadChildren:
              "../pages/sermons-detail/sermons-detail.module#SermonsDetailPageModule"
          }
        ]
      },
      {
        path: "events",
        children: [
          {
            path: "",
            loadChildren: "../pages/events/events.module#EventsPageModule"
          },
          {
            path: ":id",
            loadChildren:
              "../pages/events-detail/events-detail.module#EventsDetailPageModule"
          }
        ]
      },
      {
        path: "give",
        children: [
          {
            path: "",
            loadChildren: "../pages/give/give.module#GivePageModule"
          }
        ]
      },
      {
        path: "lifegroups",
        children: [
          {
            path: "",
            loadChildren:
              "../pages/lifegroups/lifegroups.module#LifegroupsPageModule"
          }
        ]
      },
      {
        path: "times",
        children: [
          {
            path: "",
            loadChildren: "../pages/about/times/times.module#TimesPageModule"
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
