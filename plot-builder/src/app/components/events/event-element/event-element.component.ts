import {Component, OnInit} from '@angular/core';
import {IEvent} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {DEFAULT_ID} from "../../../index";
import {StoryService} from "../../../story.service";

@Component({
    selector: 'app-event-element',
    templateUrl: './event-element.component.html',
    styleUrls: ['./event-element.component.css']
})
export class EventElementComponent implements OnInit {
    event: IEvent;
    eid = "";
    pid = "";
    sid = "";

    constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router, private location: Location,private storyService: StoryService,) {
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.pid = params['plotId'];
            this.eid = params['eventId'];
            this.sid = params['id'];
            if (this.eid == 'new') {
                this.event = this.getNew();
            } else {
                this.plotService.getEvent(this.eid, this.pid).subscribe(ievent => {
                    this.event = ievent;
                    console.log("At the event level: ", ievent)
                });
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

        if(this.sid){
            this.storyService.createNewEvent(this.sid, this.event);
            this.location.back();
        }else{
        this.plotService.updateEvent(this.event).subscribe(
            eventted => {
                this.event = eventted;
                this.location.back();
            }
        );
    }}
}
