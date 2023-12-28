import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlot} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";

@Component({
  selector: 'app-plot-subplot',
  templateUrl: './subplot.component.html',
  styleUrls: ['./subplot.component.css']
})
export class SubplotComponent implements OnInit {

  @Input()  subplots;
  // subplots: IPlot[];
  @Output() selectedPlot = new EventEmitter<IPlot>();
  base = "";


  constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService,) {
  }

  ngOnInit() {

    this.base = this.router.url.split("/(")[0];
    this.route.params.subscribe(params => {
      let id = params['parentId'];

      console.log("Subplots id", id);
      this.plotService.getPlot(id).subscribe(iplot => this.subplots = iplot.subplots)
    })
  }

  select(plot: IPlot) {
   this.selectedPlot.emit(plot);
  }


}
