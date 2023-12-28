import {Component, OnInit} from '@angular/core';
import {StoryService} from "../../../story.service";
import {IPlot, IScene} from "../../../plot.model";

@Component({
  selector: 'app-omni-list',
  templateUrl: './omni-list.component.html',
  styleUrls: ['./omni-list.component.css']
})
export class OmniListComponent implements OnInit{
  // plots:IPlot[] = this.storyService.plots;
  // scenes:IScene[] = this.storyService.scenes;


  ngOnInit(){
  }
  constructor(private storyService:StoryService) {
  }



}
