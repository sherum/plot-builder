import {Component, OnInit} from '@angular/core';
import {IPerson} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {StoryService} from "../../../story.service";
import {DEFAULT_ID} from "../../../index";

@Component({
  selector: 'app-person-element',
  templateUrl: './person-element.component.html',
  styleUrls: ['./person-element.component.css']
})
export class PersonElementComponent implements OnInit{

  personId = "";
  eventId = "";
  plotId = "";
  storyId = "";
  person: IPerson;

  newFlag = false;



  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router, private location:Location, private storyService: StoryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.personId = params['personId'];
      this.eventId = params['eventId'];
      this.plotId = params['plotId'];
      this.storyId = params['id'];
      console.log("Story ID is :",this.storyId);
      if (this.personId == 'new') {
        this.newFlag = true;
        this.person = {
          name: 'new person',
          description: 'new person description',
          id: DEFAULT_ID
        };
      } else {
        this.plotService.getPerson(this.personId).subscribe(iperson => this.person = iperson)
      }
    })
  }

  save(form) {
    this.person.name = form.value.name;
    this.person.description = form.value.description
    this.storyService.createNewPerson(this.storyId,this.person);
    this.location.back()
  }

  update(form){
    this.person.name = form.value.name;
    this.person.description = form.value.description;
    this.storyService.createNewPerson(this.storyId,this.person);
  }

}
