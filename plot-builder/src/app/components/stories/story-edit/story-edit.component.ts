
import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {defautStory, IStory} from "../../../plot.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})

export class StoryEditComponent implements OnInit{

  story:IStory = defautStory;

  constructor(private plotService:PlotService,private route:ActivatedRoute,private router:Router) {
  }

  ngOnInit(){
    this.route.paramMap.subscribe(
      data => {
        let storyId  = data.get('id');
        console.log("Ng On init Story id ", storyId);
        this.story.id = storyId;
      }
    );
  }


  save(form:NgForm){
    this.story.author = form.value.author;
    this.story.title = form.value.title;
    this.story.genre = form.value.genre;
    this.story.maguffin = form.value.maguffin;
    this.story.summary = form.value.summary;
    this.plotService.updateCurrentStory(this.story);
    this.plotService.saveStory();
    this.router.navigate(['stories']);
  }

}
