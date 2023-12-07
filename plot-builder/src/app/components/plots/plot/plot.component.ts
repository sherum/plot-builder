import { Component } from '@angular/core';
import {defaultPlots, IPlot} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent {

  plot: IPlot = {name: "new plot"};
  storyId = "";
  plotId = "";
  parentId = "";



  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log("ROuter",this.router.url);
    let foo = this.router.url.split("/")
    this.storyId = foo[2];
    console.log("Foo length: ", foo.length);

    console.log("sid ",this.storyId);
  }


  save(form) {
    this.plot.id = form.value.id;
    this.plot.name = form.value.name;
    this.plot.type = form.value.type;
    this.plot.description = form.value.description

    this.plotService.saveSubplot(this.storyId,this.parentId,this.plot).subscribe(
      plotted => console.log("saved plot",plotted)
    );
  }

  onChange(event) {
    this.plot.type = event.value;
  }

}
