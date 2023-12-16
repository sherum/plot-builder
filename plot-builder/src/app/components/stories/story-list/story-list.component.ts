import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {defautStory, IStory} from "../../../plot.model";
import {nextNewId, uid4} from "../../../index";
import {Router} from "@angular/router";
import {UserService} from "../../../user.service";

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  storyList =  this.plotService.currentStories;

  constructor(private plotService: PlotService, private userService:UserService,private router: Router){
  }

  ngOnInit() {

   // this.plotService.getStories(this.userService.currentId).subscribe(data => this.plotService.updateCurrentStories(data));

   // console.log("Signals List", this.plotService.currentStories());

  }

  createStory() {
    console.log("Creeat sotry pressed to show form");
    let id = uid4();
    console.log("UUID is ",id);
    this.router.navigate(['/stories', id,'new']);
  }

  selectStory(story:IStory){
    this.plotService.updateCurrentStory(story);
    this.router.navigate(['/stories',story.id]);
  }


}
