import { Component, OnInit} from '@angular/core';
import {IPlot} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-plot-detail',
  templateUrl: './plot-detail.component.html',
  styleUrls: ['./plot-detail.component.css']
})
export class PlotDetailComponent implements OnInit{

  plot:IPlot|undefined;
  subplots:IPlot[]|undefined;


  constructor(private plotService:PlotService,private route:ActivatedRoute,private router:Router) {
  }

  ngOnInit(){
    console.log("I'm a Plot Detail!");
    this.plot = this.plotService.currentPlot();
    console.log("This plot", this.plot);
    console.log("Signal", this.plotService.currentPlot());
    //this.subplots = this.plot.subplots;
  }


}
