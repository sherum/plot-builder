import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {IEvent, ILocation, IThing} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";
import {StoryService} from "../../../story.service";

@Component({
  selector: 'app-thing-list',
  templateUrl: './thing-list.component.html',
  styleUrl: './thing-list.component.css'
})
export class ThingListComponent implements OnInit {

  storyId = '';
  things:Observable<IThing[]>

  constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService, private storyService: StoryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storyId = params['id'];
      this.things = this.storyService.getStoryThings(this.storyId);
      console.log("Getting Story Things")
    });
  }

  refresh(){
    this.things = of(this.plotService.currentStory().things);
  }



}
