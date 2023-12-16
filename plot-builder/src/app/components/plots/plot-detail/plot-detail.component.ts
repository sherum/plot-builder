import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPlot} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-plot-detail',
  templateUrl: './plot-detail.component.html',
  styleUrls: ['./plot-detail.component.css']
})
export class PlotDetailComponent implements OnInit {

  @Input() plot;
  @Output() savePlot = new EventEmitter<IPlot>()
  parentId = "";


  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {


    // this.route.paramMap.subscribe(
    //   param =>{
    //     this.parentId  = param.get('id');
    //    // this.plot = this.plotService.currentPlot();
    //
    //   }
    // )


  }


  save(form) {
    let update: IPlot = {
      name: form.value.name,
      type: form.value.type,
      id: form.value.id,
      parentId: form.value.parentId,
      description: form.value.description
    }
    this.savePlot.emit(update);
    // this.plotService.savePlot(this.parentId,plot).subscribe(
    //   plotted => console.log("saved plot", plotted)
    // );
  }

}
