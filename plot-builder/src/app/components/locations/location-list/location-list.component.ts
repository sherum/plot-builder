import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IEvent, ILocation} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoryService} from "../../../story.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit {

  storyId = '';
  locations:Observable<ILocation[]> ;
  events:Observable<IEvent[]>;


  constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService, private storyService: StoryService) {
  }

  ngOnInit(): void {
    this.storyId = this.route.snapshot.params['id'];
    this.locations = this.storyService.getStoryLocations(this.storyId);
    this.events = this.storyService.getStoryEvents(this.storyId);
  }


}
