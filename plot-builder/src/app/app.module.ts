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
import {EventComponent} from "./components/events/event/event.component";
import {EventListComponent} from "./components/events/event-list/event-list.component";
import {OmniListComponent} from "./components/omni/omni-list/omni-list.component";
import {PersonElementComponent} from "./components/persons/person-element/person-element.component";
import {PersonListComponent} from "./components/persons/person-list/person-list.component";
import {ThingListComponent} from "./components/things/thing-list/thing-list.component";
import {ThingElementComponent} from "./components/things/thing-element/thing-element.component";
import {EventElementComponent} from "./components/events/event-element/event-element.component";
import {AltPlotElementComponent} from "./components/plots/alt-plot-element/alt-plot-element.component";
import {PlotLoopComponent} from "./components/plots/plot-loop/plot-loop.component";

import {LocationListComponent} from "./components/locations/location-list/location-list.component";
import {LocationElementComponent} from "./components/locations/location-element/location-element.component";


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
    SubplotComponent,
    EventComponent,
    EventListComponent,
    OmniListComponent,
    PersonElementComponent,
    PersonListComponent,
    ThingListComponent,
    ThingElementComponent,
    EventListComponent,
    EventElementComponent,
    AltPlotElementComponent,
    PlotLoopComponent,
    LocationElementComponent,
    LocationListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [
    PlotListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
