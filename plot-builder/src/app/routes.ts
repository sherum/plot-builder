import {Routes} from "@angular/router";
import {StoryListComponent} from "./components/stories/story-list/story-list.component";
import {StoryEditComponent} from "./components/stories/story-edit/story-edit.component";
import {StoryComponent} from "./components/stories/story/story.component";
import {PlotListComponent} from "./components/plots/plot-list/plot-list.component";
import {EventListComponent} from "./components/events/event-list/event-list.component";
import {SceneListComponent} from "./components/scenes/scene-list/scene-list.component";
import {SceneElementComponent} from "./components/scenes/scene-element/scene-element.component";
import {PersonElementComponent} from "./components/persons/person-element/person-element.component";
import {PersonListComponent} from "./components/persons/person-list/person-list.component";
import {LocationListComponent} from "./components/locations/location-list/location-list.component";
import {LocationElementComponent} from "./components/locations/location-element/location-element.component";
import {ThingElementComponent} from "./components/things/thing-element/thing-element.component";
import {EventElementComponent} from "./components/events/event-element/event-element.component";
import {ThingListComponent} from "./components/things/thing-list/thing-list.component";
import {AltPlotElementComponent} from "./components/plots/alt-plot-element/alt-plot-element.component";

export const alt_routes: Routes = [
    {path: 'stories', component: StoryListComponent, children: [{path: 'edit/:id', component: StoryEditComponent}]},
// {path: 'stories', component: StoryListComponent},


    {
        path: 'stories/story/:id', component: StoryComponent, children: [
             {
                path: 'plots', component: PlotListComponent, children: [
                    {
                        path: ':plotId', component: AltPlotElementComponent, children: [
                            // {path: ':subplotId', component: AltPlotElementComponent},
                            // {path: ':eventId', component: EventElementComponent}
                        ]
                    },
                    {path: 'scenes', component: SceneListComponent, children: [{path: ':sceneId', component: SceneElementComponent}]},

                    {path: 'persons', component: PersonListComponent, children: [{path: ':personId', component: PersonElementComponent}]},

                    {path: 'events', component: EventListComponent, children: [{path: ':eventId', component: EventElementComponent}]},

                    {path: 'locations', component: LocationListComponent, children: [{path: ':locationId', component: LocationElementComponent}]},

                    {path: 'things', component: ThingListComponent, children: [{path: ':thingId', component: ThingElementComponent}]},
                ]
            },


        ]
    }]
