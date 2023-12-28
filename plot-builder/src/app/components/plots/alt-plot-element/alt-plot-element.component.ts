import { Component,OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IPlot} from "../../../plot.model";

@Component({
  selector: 'app-alt-plot-element',
  templateUrl: './alt-plot-element.component.html',
  styleUrls: ['./alt-plot-element.component.css']
})
export class AltPlotElementComponent implements OnInit{
  plot: IPlot = {
    name: 'new',
    type: 'Character',
    description: 'plot description',
    id: "new",
  };
  subplots:Array<any>;
  events:Array<any>;
  storyId ="";

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['plotId'];
      if (id != 'new') {
        this.plotService.getPlot(id).subscribe(iplot => {
          this.plot = iplot;
          this.subplots = iplot.subplots;
          this.events = iplot.events;
          console.log("this plot",this.plot);
        });

      }else{
        this.plot = {
          name: 'new',
          type: 'Character',
          description: 'plot description',
          id: "new",
        };
      }
    });


    // console.log("ROuter", this.router.url);
    // let foo = this.router.url.split("/")
    // this.storyId = foo[2];
    // console.log("Foo length: ", foo.length);
    // console.log("plot type ", this.plot.type);
  }


  save(form) {
    this.plot.name = form.value.name;
    this.plot.type = form.value.type;
    this.plot.description = form.value.description

    this.plotService.saveTopPlot(this.storyId, this.plot).subscribe(
      plotted => console.log("saved plot", plotted)
    );
  }


  select(event){
    this.router.navigate([event.id]);
  }
}

