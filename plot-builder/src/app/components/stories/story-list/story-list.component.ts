import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {defautStory, IStory} from "../../../plot.model";
import {DEFAULT_ID, nextNewId, uid4} from "../../../index";
import {Router} from "@angular/router";
import {UserService} from "../../../user.service";
import {StoryService} from "../../../story.service";

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  storyList =  this.plotService.currentStories;

  constructor(private plotService: PlotService, private userService:UserService,private router: Router,private storyService:StoryService){
  }

  ngOnInit() {

    // this.plotService.getStories().subscribe(stories=>console.log("Story List",stories));
   // this.plotService.getStories(this.userService.currentId).subscribe(data => this.plotService.updateCurrentStories(data));

   // console.log("Signals List", this.plotService.currentStories());

  }

  createStory() {
    console.log("Creeat sotry pressed to show form");
    // let id = DEFAULT_ID;
    // console.log("UUID is ",id);
    this.router.navigate(['/home','stories','edit']);
  }

  selectStory(story:IStory){
    //****************subject***********
    this.storyService.selectStory(story);
    //**********************************
    this.plotService.updateCurrentStory(story);
    // this.router.navigate(['/e,story.id]);
  }


}
