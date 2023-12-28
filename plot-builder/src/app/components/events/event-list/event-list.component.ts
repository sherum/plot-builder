import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute} from "@angular/router";
import {IEvent} from "../../../plot.model";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @Input()  events;
  @Output() selectedEvent = new EventEmitter<IEvent>();
  // events;

  constructor(private plotService: PlotService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id = params['parentId'];

      console.log("Events id", id);
      this.plotService.getPlot(id).subscribe(iplot => this.events = iplot.events)
    })
  }

  select(event) {
    this.selectedEvent.emit(event);
  }

}
