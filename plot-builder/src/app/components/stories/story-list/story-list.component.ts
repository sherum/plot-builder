import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {defautStory, IStory} from "../../../plot.model";
import {nextNewId} from "../../../index";
import {Router} from "@angular/router";
import { v4 as uuidv4 } from 'uuid';
import {UserService} from "../../../user.service";

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  storyList =  this.plotService.getStories();

  constructor(private plotService: PlotService, private userService:UserService,private router: Router){
  }

  ngOnInit() {

   // this.plotService.getStories(this.userService.currentId).subscribe(data => this.plotService.updateCurrentStories(data));

   // console.log("Signals List", this.plotService.currentStories());

  }

  createStory() {
    console.log("Creeat sotry pressed to show form");
    let id = uuidv4();
    console.log("UUID is ",id);
    this.router.navigate(['/stories', id,'new']);
  }


}
