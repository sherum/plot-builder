import {Component, Input, OnInit} from '@angular/core';
import {IPlot} from "../../../plot.model";
import {Router} from "@angular/router";
import {PlotService} from "../../../plot.service";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent implements OnInit{

@Input() plotlist:IPlot[];

constructor(private router:Router,private plotService:PlotService) {
}

  ngOnInit(): void {
     console.log("Plot List component active:",this.router);
    }

detailView(plot:IPlot){
  this.plotService.updateCurrentPlot(plot);
  this.router.navigate(['/plots',plot.id])

}
}

