import {Component} from '@angular/core';
import {defaultLocation, IEvent, ILocation} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-location-element',
  templateUrl: './location-element.component.html',
  styleUrls: ['./location-element.component.css']
})
export class LocationElementComponent {

  locationId = "";
  eventId = "";
  plotId = "";
  relatedEvent:IEvent;
  location: ILocation = {
    name: 'new location',
    events: [],
    scenes: [],
    description: 'new location description',
    id: "new",
  };

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.locationId = params['locationId'];
      this.eventId = params['eventId'];
      this.plotId = params['plotId'];
      this.plotService.getEvent(this.eventId, this.plotId).subscribe(ievent =>this.relatedEvent = ievent);
      if (this.locationId == 'new') {
        this.location = defaultLocation;
      } else {
        this.plotService.getLocation(this.locationId).subscribe(iloc => this.location = iloc)
      }
    })
  }

  save(form) {
    this.location.name = form.value.name;
    this.location.id = form.value.id;
    this.location.description = form.value.description

    this.plotService.saveLocation(this.eventId, this.location).subscribe(
      locationted => console.log("saved location", locationted)
    );
  }

}
