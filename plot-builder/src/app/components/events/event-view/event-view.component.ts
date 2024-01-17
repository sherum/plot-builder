import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IEvent} from "../../../plot.model";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrl: './event-view.component.css'
})
export class EventViewComponent implements  OnInit {
events = this.plotService.getEvents();

  constructor(private plotService:PlotService,private route:ActivatedRoute,private router:Router) {
  }
  ngOnInit(){

  }

  createEvent(){

  }
}
