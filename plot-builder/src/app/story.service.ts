import {Injectable} from '@angular/core';
import {IPlot, IStory,IScene} from "./plot.model";
import {BehaviorSubject, Subject} from "rxjs";
import {PlotService} from "./plot.service";

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  selectedStory = new BehaviorSubject<IStory>(this.plotservice.currentStory());
  selectedStory$ = this.selectedStory.asObservable();
  plots:IPlot[];
  scenes:IScene[];

  constructor(private plotservice:PlotService) { }


  selectStory(istory:IStory){
    console.log("story service select story");
    this.selectedStory.next(istory);
    // this.selectedStory$.subscribe(story=>{
    //   this.plots = story.plots;
    //   this.scenes = story.scenes;
    //   console.log("Inside story service select story", this.plots);
    // });
  }
}
