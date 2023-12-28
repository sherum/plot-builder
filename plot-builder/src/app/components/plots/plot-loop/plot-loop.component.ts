import {Component, effect, Input, OnInit, signal} from '@angular/core';
import {defaultPlots, IPlot} from "../../../plot.model";
import {NgForOf} from "@angular/common";
import {single} from "rxjs";

@Component({
  selector: 'app-plot-loop',
  templateUrl: './plot-loop.component.html',
  styleUrl: './plot-loop.component.css'
})
export class PlotLoopComponent implements OnInit{
@Input() plotlist:IPlot[];
listLength ;


constructor() {
}

  ngOnInit(): void {
  this.listLength  = this.plotlist.length;
  }

}
