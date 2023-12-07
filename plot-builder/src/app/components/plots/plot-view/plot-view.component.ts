import {Component, effect, Input, OnInit} from '@angular/core';
import {defaultPlots, IPlot} from "../../../plot.model";
import {ActivatedRoute} from "@angular/router";
import {PlotService} from "../../../plot.service";


const PLOTS = defaultPlots;

@Component({
  selector: 'app-plot-view',
  templateUrl: './plot-view.component.html',
  styleUrls: ['./plot-view.component.css']
})
export class PlotViewComponent implements OnInit {
  activePlot: IPlot;
  parentPlot: IPlot;

  constructor(private router: ActivatedRoute,private plotService:PlotService) {
    let clone = this.deepClone(PLOTS.find(plot => plot.parentId == "0"));
    this.parentPlot = clone;
    this.activePlot = clone;

  }

  ngOnInit(): void {
         this.router.paramMap.subscribe(
        params => {
          const pid = params.get('id');
          this.plotService.updateCurrentPlot(this.getPlotById(pid));

        }
      )
    }


  getPlotById(id: string): IPlot {
    return PLOTS.find(plot => plot.id === id);
  }


  deepClone<T extends object | null | undefined>(obj: T): T {
    return obj ? JSON.parse(JSON.stringify(obj)) : null;
  }


}
