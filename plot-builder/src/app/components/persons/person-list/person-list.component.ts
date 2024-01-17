import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {IPerson, IThing} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";
import {StoryService} from "../../../story.service";

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  storyId = '';
  persons:Observable<IPerson[]>

  constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService, private storyService: StoryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storyId = params['id'];
      this.persons = this.storyService.getStoryPersons(this.storyId);
      console.log("Getting Story Persons")
    });
  }

  refresh(){
    this.persons = of(this.plotService.currentStory().people);
  }




}
