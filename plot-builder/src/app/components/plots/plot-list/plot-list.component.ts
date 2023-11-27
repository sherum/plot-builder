import {Component, Input} from '@angular/core';
import {IPlot} from "../../../plot.model";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent {

@Input() plotlist:IPlot[];

}
