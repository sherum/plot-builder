import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlotService} from "../../../plot.service";
import {Location} from "@angular/common";
import {IPlot} from "../../../plot.model";
import {DEFAULT_ID, uid4} from "../../../index";


@Component({
  selector: 'app-plot-view',
  templateUrl: './plot-view.component.html',
  styleUrls: ['./plot-view.component.css']
})
export class PlotViewComponent implements OnInit {
  plot = this.plotService.currentPlot();
  story = this.plotService.currentStory();
  cursor = 0;
  hx = new Array<IPlot>();
  parentId = "";

  constructor(private route: ActivatedRoute, private router: Router, private plotService: PlotService, private location: Location) {
  }

  ngOnInit(): void {
    this.parentId = this.plot.id;
    this.hx.push(this.plot);

  }


  back(): void {
    this.location.back();
  }

  previous() {
    if (this.cursor > 0) {
      this.cursor -= 1;
      this.plot = this.hx[this.cursor]
    } else {
      this.plot = this.hx[0]
    }

  }

  next() {
    if (this.hx.length > this.cursor - 1) {
      this.cursor += 1;
      this.plot = this.hx[this.cursor]
    } else {
      this.plot = this.hx[this.cursor];
    }
  }

  addSubplot() {
    let newSubplot:IPlot = {
      name:"new sub",
      id:uid4(),
      parentId:this.plot.id,
      type:'new type',
      description:'new plot'
    }
    this.plot.subplots.push(newSubplot);

  }

  setCurrentPlot(event) {
    this.hx.push(event);
    this.cursor = this.hx.findIndex(p => p.name == event.name);
    this.plot = event;

  }

  addPlot() {

  }

  addEvent(){
    this.router.navigate(['event',DEFAULT_ID]);
  }

  selectPlot(plot) {
    this.plot = plot
    this.hx = [];
    this.cursor = 0;

  }

  updatePlotTree(plot:IPlot){
    let parentId = plot.parentId;
    console.log("subplot parentId",parentId);
    this.plotService.savePlotTree(parentId,plot).subscribe(data => this.plot = data);
    // if(plot.id == plot.parentId){
    //   this.plotService.updatePlot(plot)
    // }
    // this.plotService.savePlot(parentId,plot).subscribe(data =>this.plot = data);
  }



}
