import {Component, OnInit} from '@angular/core';
import {IPlot} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";
import {StoryService} from "../../../story.service";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent implements OnInit {

//@Input() plotlist:IPlot[];
  plotlist;
  listLength;


  constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService, private storyService: StoryService) {
  }

  ngOnInit(): void {
    let sid = this.route.snapshot.params['id'];
    this.plotService.getStory(sid).subscribe(story => this.plotlist = story.plots);
   if(this.plotlist.plots.length){
     this.listLength = "not zero"
   }else{
     this.listLength= 'gaybj'
   };
  }

  detailView(plot: IPlot) {
    this.plotService.currentPlot.set(plot);
    this.router.navigate([plot.id]);
    // this.router.navigate([]);
    // this.router.navigate([{outlets:{events:['evt']}}]);


  }

  omniView(plot: IPlot) {
    this.plotService.currentPlot.set(plot);
    this.router.navigate(['/omni', plot.id, 'event']);
    console.log("Omni nav ", plot.id);

  }

  newPlot() {

  }
}

