import { Component,OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {defaultEvent, IEvent, IPlot} from "../../../plot.model";
import {DEFAULT_ID} from "../../../index";
import {Location} from "@angular/common";

@Component({
  selector: 'app-alt-plot-element',
  templateUrl: './alt-plot-element.component.html',
  styleUrls: ['./alt-plot-element.component.css']
})
export class AltPlotElementComponent implements OnInit{
  plot: IPlot ;
  //   = {
  //   name: 'new',
  //   type: 'Character',
  //   description: 'plot description',
  //   id: "new",
  // };
  events:IEvent[];
  storyId ="";
  plotId="";

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router, private location:Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.plotId = params['plotId'];
      this.storyId = params['id'];
      if (this.plotId =='new') {
        this.plot = {
          name: 'new',
          type: 'Character',
          description: 'plot description',
          id: "new",
        };
      }else {
        this.plotService.getPlot(this.plotId).subscribe(iplot => {
          this.plot = iplot;
          this.events = iplot.events;
          console.log("this plot", this.plot);
        });
      }
    });
  }


  createSubplot(){
    let subplot:IPlot = {
      name:'new',
      id:DEFAULT_ID,
      type:'child plot',
      parentId:this.plotId,
      description:' new description'
    }
    this.plotService.savePlot(this.plotId,subplot).subscribe(iplot =>{
      this.router.navigate(['stories','story',this.storyId,'plots',iplot.id]);

    });
  }

  save(form) {
    this.plot.name = form.value.name;
    this.plot.type = form.value.type;
    this.plot.description = form.value.description
    if(this.plot.id == 'new'){
      this.plot.id = DEFAULT_ID;
    }
    this.plotService.savePlot(this.plot.parentId, this.plot).subscribe(
      plotted =>  this.router.navigate(['stories','story',this.storyId,'plots'])
    );
  }


  deletePlot(pid:string){
    this.plotService.deletePlot(pid);
    this.router.navigate(['stories','story',this.storyId,'plots']);
  }
 createEvent(){
    this.plotService.saveEvent(this.plotId,defaultEvent).subscribe(evt => console.log("Saved "))
    this.events.push(defaultEvent);

   //display the router outlet
 }
  selectEvent(event){
    this.router.navigate([event.id]);
  }
}

