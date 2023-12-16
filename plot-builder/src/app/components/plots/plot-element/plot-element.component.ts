import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlot} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subscription} from "rxjs";
import {uid4} from "../../../index";

@Component({
  selector: 'app-plot-element',
  templateUrl: './plot-element.component.html',
  styleUrls: ['./plot-element.component.css']
})
export class PlotElementComponent implements OnInit {
  plot:IPlot = {
    name:'new',
    type:'Character',
    description:'plot description',
    id:uid4(),
    };
  storyId = "";
  plotId = "";



  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log("ROuter",this.router.url);
    let foo = this.router.url.split("/")
    this.storyId = foo[2];
    console.log("Foo length: ", foo.length);
    console.log("plot type ",this.plot.type);
    }


  save(form) {
   this.plot.name = form.value.name;
    this.plot.type = form.value.type;
    this.plot.description = form.value.description

    this.plotService.saveTopPlot(this.storyId,this.plot).subscribe(
      plotted => console.log("saved plot",plotted)
    );
  }

}
