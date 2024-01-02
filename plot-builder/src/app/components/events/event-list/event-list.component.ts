import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router:Router) {

  }

  ngOnInit() {

    console.log("Events",this.events);
  }

  select(event) {
    this.selectedEvent.emit(event);
  }

  // openLocation(id:string){
  //   this.router.navigate(['locations',id]);
  // }
}
