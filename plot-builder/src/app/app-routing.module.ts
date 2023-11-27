import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlotComponent} from "./components/plots/plot/plot.component";
import {PlotViewComponent} from "./components/plots/plot-view/plot-view.component";
import {StoryListComponent} from "./components/stories/story-list/story-list.component";
import {StoryComponent} from "./components/stories/story/story.component";
import {StoryEditComponent} from "./components/stories/story-edit/story-edit.component";

const routes: Routes = [
  {
    path: 'plots', component: PlotComponent, children: [
      {
        path: ':id', component: PlotViewComponent
      }
    ]
  },
  {
    path: 'stories', component: StoryListComponent, children: [
      {
        path: ':id/new', component: StoryEditComponent
      },
     {
        path: ':id', component: StoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
