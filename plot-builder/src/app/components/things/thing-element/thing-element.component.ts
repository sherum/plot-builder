import {Component, OnInit} from '@angular/core';
import {IThing} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StoryService} from "../../../story.service";
import {DEFAULT_ID} from "../../../index";
import {Location} from "@angular/common";

@Component({
  selector: 'app-thing-element',
  templateUrl: './thing-element.component.html',
  styleUrls: ['./thing-element.component.css']
})
export class ThingElementComponent implements OnInit{

  thingId = "";
  eventId = "";
  plotId = "";
  storyId = "";
  thing: IThing;

  newFlag = false;



  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router, private location:Location, private storyService: StoryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.thingId = params['thingId'];
      this.eventId = params['eventId'];
      this.plotId = params['plotId'];
      this.storyId = params['id'];
      console.log("Story ID is :",this.storyId);
      if (this.thingId == 'new') {
        this.newFlag = true;
        this.thing = {
          name: 'new thing',
          description: 'new thing description',
          id: DEFAULT_ID
        };
      } else {
        this.plotService.getThing(this.thingId).subscribe(ithing => this.thing = ithing)
      }
    })
  }

  save(form) {
    this.thing.name = form.value.name;
    this.thing.description = form.value.description
    this.storyService.createNewThing(this.storyId,this.thing);
    this.location.back()
  }

  update(form){
    this.thing.name = form.value.name;
    this.thing.description = form.value.description;
    this.storyService.createNewThing(this.storyId,this.thing);
  }

}
