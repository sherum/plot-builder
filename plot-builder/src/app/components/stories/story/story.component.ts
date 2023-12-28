import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {defautStory, IPlot, IStory} from "../../../plot.model";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  // story: IStory = this.plotService.currentStory();
   story: IStory;
  storyId: string = '';

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
        let id  = data['id'];

        this.plotService.getStory(id).subscribe(storee => this.story = storee);

      }
    );
  }


  addPlot() {
    this.router.navigate(['/story', this.story.id,'plot']);
  }

  selectPlot(plot:IPlot){
    this.plotService.currentPlot.set(plot);
    // this.router.navigate( ['/plots',plot.id]);
    // this.router.navigate( ['/plots']);
    this.router.navigate( ['plots']);
  }

  addScene() {

  }

  save() {
    this.plotService.updateCurrentStory(this.story);
    this.plotService.updateStory(this.story.id);
    this.router.navigate(['stories']);
  }

}
