import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {defautStory, IStory} from "../../../plot.model";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit{

  story:IStory = defautStory;

  constructor(private plotService:PlotService,private route:ActivatedRoute,private router:Router) {
  }

  ngOnInit(){

    this.route.paramMap.subscribe(
      data => {
       let storyId  = data.get('id');
        console.log("Ng On init Story id ", storyId);
        this.story = this.plotService.currentStories().find(story => story.id == storyId)
        console.log("selected story ",this.story);
      }
    );
  }



  addPlot(){

  }

  addScene(){

  }
  save(){
    this.plotService.updateCurrentStory(this.story);
    this.plotService.updateStory(this.story.id);
    this.router.navigate(['stories']);
  }

}
