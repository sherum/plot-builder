import {Component, OnInit} from '@angular/core';
import {IEvent} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-event-element',
  templateUrl: './event-element.component.html',
  styleUrls: ['./event-element.component.css']
})
export class EventElementComponent implements OnInit {
  event: IEvent;

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let eid = "";
    this.route.params.subscribe(params => {
      let pid = params['plotId'];
      eid = params['eventId'];
      this.plotService.getEvent(eid, pid).subscribe(ievent => this.event = ievent)
    });
    if (eid == 'new') {
      this.event = {
        id: 'new',
        name: "event",
        dtg: '1Jan 1997',
        type: 'incident',
        location: 'Dullus Airport',
        description: "Two lovers meet.",
      };
    }

  }

  save(form) {
    this.event.name = form.value.name;
    this.event.type = form.value.type;
    this.event.dtg = form.value.dtg;
    this.event.location = form.value.location;
    this.event.description = form.value.description

    // this.plotService.saveEvent(this.event).subscribe(
    //   eventted => console.log("saved event", eventted)
    // );
  }
}
