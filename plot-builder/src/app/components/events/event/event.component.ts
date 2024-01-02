import {Component, OnInit} from '@angular/core';
import {IEvent} from "../../../plot.model";
import {PlotService} from "../../../plot.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  event: IEvent;

  ngOnInit(){


  }
  constructor(private plotService: PlotService) {

  }

  save(form) {
    let update: IEvent = {
      name: form.value.name,
      type: form.value.type,
      dtg: form.value.dtg,
      id: form.value.id,
      location:this.event.location,
      description: form.value.description
    }
    console.log("Event", update);
    console.log("current plot: ", this.plotService.currentPlot().id);
    this.plotService.savePlotEvent(this.plotService.currentPlot().id, update).subscribe(data => {
      this.plotService.currentPlot.set(data)
    });
  }

}
