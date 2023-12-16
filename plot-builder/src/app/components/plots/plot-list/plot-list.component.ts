import {Component, Input, OnInit} from '@angular/core';
import {IPlot} from "../../../plot.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";

@Component({
  selector: 'app-plot-list',
  templateUrl: './plot-list.component.html',
  styleUrls: ['./plot-list.component.css']
})
export class PlotListComponent implements OnInit{

@Input() plotlist:IPlot[];


constructor(private route:ActivatedRoute,private router:Router,private plotService:PlotService) {
}

  ngOnInit(): void {

    }

detailView(plot:IPlot){
  this.plotService.currentPlot.set(plot);
  this.router.navigate(['/plots']);
  console.log("DetailView nav ",plot.id);

}
}

