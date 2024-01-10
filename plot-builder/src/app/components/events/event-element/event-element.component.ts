import {Component, OnInit} from '@angular/core';
import {defaultEvent, defaultLocation, IEvent, ILocation} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DEFAULT_ID, uid4} from "../../../index";

@Component({
  selector: 'app-event-element',
  templateUrl: './event-element.component.html',
  styleUrls: ['./event-element.component.css']
})
export class EventElementComponent implements OnInit {
  event: IEvent;
  eid = "";
  pid = "";

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.pid = params['plotId'];
      this.eid = params['eventId'];
      if (this.eid == 'new') {
        this.event = this.getNew();
      } else {
        this.plotService.getEvent(this.eid, this.pid).subscribe(ievent => {
          this.event = ievent;
          // this.plotService.getLocation(ievent.locationId).subscribe(iloc => this.eventLocation = iloc);
        })
      }
    });
  }

  getNew(): IEvent {

    this.eid = DEFAULT_ID;
    let nevent = {
      id: DEFAULT_ID,
      name: "event",
      dtg: '1 Jan 1997:1400',
      type: 'incident',
      location: defaultLocation,
      description: "Two lovers meet.",
    }
    return nevent;

  }

  save(form) {
    this.event.name = form.value.name;
    this.event.type = form.value.type;
    this.event.dtg = form.value.dtg;
    //this.event.location = form.value.location;
    this.event.description = form.value.description;
    //this.event.id != d?this.event.id:uid4();

    console.log("Event id after save",this.event.id);
    this.plotService.updateEvent(this.event).subscribe(
      eventted => {
        this.event = eventted;
        this.location.back();
      }
    );
  }
}
