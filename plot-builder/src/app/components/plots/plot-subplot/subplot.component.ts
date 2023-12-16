import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {IPlot} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";

@Component({
  selector: 'app-plot-subplot',
  templateUrl: './subplot.component.html',
  styleUrls: ['./subplot.component.css']
})
export class SubplotComponent implements OnInit{

  @Input()  subplots;
  @Output() selectedPlot = new EventEmitter<IPlot>();
  constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService) {}
  ngOnInit(){
  }

  select(plot: IPlot) {
    this.selectedPlot.emit(plot);
    console.log("Selected Plot name ",plot.name);
  }


}
