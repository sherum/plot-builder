import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {defautStory, IStory} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.css']
})
export class StoryViewComponent implements OnInit{

  story: IStory = defautStory;

  constructor(private route:ActivatedRoute,private plotService:PlotService,private location:Location,private router:Router) {
  }

  ngOnInit(){

    this.route.paramMap.subscribe(
      data => {
        let storyId  = data.get('id');
        console.log("Ng On init Story id ", storyId);
        this.plotService.getStory(storyId).subscribe(storee=> this.story = storee);
        console.log("story view ",this.story);
      }
    );
  }

  back():void{
    this.location.back();
  }
  newPlot():void{
    this.router.navigate(['plot'])
  }
}
