import {Routes} from "@angular/router";
import {StoryListComponent} from "./components/stories/story-list/story-list.component";
import {StoryEditComponent} from "./components/stories/story-edit/story-edit.component";
import {StoryComponent} from "./components/stories/story/story.component";
import {PlotListComponent} from "./components/plots/plot-list/plot-list.component";
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
import {AppComponent} from "./app.component";
import {EventViewComponent} from "./components/events/event-view/event-view.component";
import {EventsAllComponent} from "./components/events/events-all/events-all.component";

export const alt_routes: Routes = [
    {
        path: 'home', children: [
            {
                path: '', component: AppComponent, children: [
                    {
                        path: 'stories',
                        component: StoryListComponent,
                        children: [
                            {
                                path: 'edit',
                                component: StoryEditComponent
                            },
                            {
                                path: 'story/:id', component: StoryComponent, children: [
                                    {
                                        path: 'plots', component: PlotListComponent, children: [
                                            {
                                                path: ':plotId', component: AltPlotElementComponent, children: [

                                                    {path: 'event/:eventId/location/:locationId', component: LocationElementComponent},
                                                    {path: 'event/:eventId', component: EventElementComponent},
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        path: 'scenes',
                                        component: SceneListComponent,
                                        children: [{path: ':sceneId', component: SceneElementComponent}]
                                    },

                                    {
                                        path: 'persons',
                                        component: PersonListComponent,
                                        children: [{path: ':personId', component: PersonElementComponent}]
                                    },

                                    {
                                        path: 'events',
                                        component: EventsAllComponent,
                                        children: [{path: ':eventId', component: EventElementComponent}]
                                    },

                                    {
                                        path: 'locations',
                                        component: LocationListComponent,
                                        children: [{path: ':locationId', component: LocationElementComponent}]
                                    },

                                    {
                                        path: 'things',
                                        component: ThingListComponent,
                                        children: [{path: ':thingId', component: ThingElementComponent}]
                                    },
                                ]
                            }]
                    }
                ]
            },


            // {path:'location/:locationId', component:LocationElementComponent,outlet:'loc'}


        ]
    }]

