import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlotComponent} from "./components/plots/plot/plot.component";
import {PlotViewComponent} from "./components/plots/plot-view/plot-view.component";
import {StoryListComponent} from "./components/stories/story-list/story-list.component";
import {StoryComponent} from "./components/stories/story/story.component";
import {StoryEditComponent} from "./components/stories/story-edit/story-edit.component";
import {ProfileComponent} from "./components/profiles/profile/profile.component";
import {PlotListComponent} from "./components/plots/plot-list/plot-list.component";
import {StoryViewComponent} from "./components/stories/story-view/story-view.component";
import {PlotElementComponent} from "./components/plots/plot-element/plot-element.component";
import {PlotDetailComponent} from "./components/plots/plot-detail/plot-detail.component";

const routes: Routes = [
  {
    path: 'plots', component: PlotListComponent, children: [
      {path: ':id', component: PlotDetailComponent}
    ]
  },


  {
    path: 'stories', component: StoryListComponent, children: [
      {path: ':id/new', component: StoryEditComponent},
      {path: ':id', component: StoryComponent},
    ]
  },
  {path: "profile", component: ProfileComponent},
  {path: 'story/:id', component: StoryViewComponent, children:[
      {path:'plot/:plotId',component: PlotElementComponent},
      {path:'plot',component: PlotElementComponent}
    ]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
