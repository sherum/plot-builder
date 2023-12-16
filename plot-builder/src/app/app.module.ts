import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlotComponent } from './components/plots/plot/plot.component';
import { PlotViewComponent } from './components/plots/plot-view/plot-view.component';
import { PlotListComponent } from './components/plots/plot-list/plot-list.component';
import { PlotElementComponent } from './components/plots/plot-element/plot-element.component';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { StoryComponent } from './components/stories/story/story.component';
import { StoryListComponent } from './components/stories/story-list/story-list.component';
import { StoryViewComponent } from './components/stories/story-view/story-view.component';
import {HttpClientModule} from "@angular/common/http";
import { StoryEditComponent } from './components/stories/story-edit/story-edit.component';
import { ProfileComponent } from './components/profiles/profile/profile.component';
import { PlotDetailComponent } from './components/plots/plot-detail/plot-detail.component';
import {SubplotComponent} from "./components/plots/plot-subplot/subplot.component";


@NgModule({
  declarations: [
    AppComponent,
    PlotComponent,
    PlotViewComponent,
    PlotListComponent,
    PlotElementComponent,
    StoryComponent,
    StoryListComponent,
    StoryViewComponent,
    StoryEditComponent,
    ProfileComponent,
    PlotDetailComponent,
    SubplotComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
