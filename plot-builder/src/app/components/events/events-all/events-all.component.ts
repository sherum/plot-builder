import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {IEvent, ILocation} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";
import {StoryService} from "../../../story.service";

@Component({
    selector: 'app-events-all',
    templateUrl: './events-all.component.html',
    styleUrl: './events-all.component.css'
})
export class EventsAllComponent implements OnInit {

    storyId = '';
    locations: Observable<ILocation[]>;
    events: Observable<IEvent[]>;


    constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService, private storyService: StoryService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.storyId = params['id'];
            this.locations = this.storyService.getStoryLocations(this.storyId);
            this.events = this.storyService.getStoryEvents(this.storyId);
        });
    }

    updateLocation(eventId: string, locationId: string) {
        this.plotService.linkEventLocation(eventId, locationId)

    }


}
