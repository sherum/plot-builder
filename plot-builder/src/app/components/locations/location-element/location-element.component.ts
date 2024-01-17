import {Component} from '@angular/core';
import {ILocation} from "../../../plot.model";
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DEFAULT_ID} from "../../../index";
import {StoryService} from "../../../story.service";

@Component({
    selector: 'app-location-element',
    templateUrl: './location-element.component.html',
    styleUrls: ['./location-element.component.css']
})
export class LocationElementComponent {

    locationId = "";
    eventId = "";
    plotId = "";
    storyId = "";
    location: ILocation;

    newFlag = false;


    constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router, private storyService: StoryService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.locationId = params['locationId'];
            this.eventId = params['eventId'];
            this.plotId = params['plotId'];
            this.storyId = params['id'];
            console.log("Story ID is :",this.storyId);
            if (this.locationId == 'new') {
                this.newFlag = true;
                this.location = {
                    name: 'new location',
                    description: 'new location description',
                    id: DEFAULT_ID
                };
            } else {
                this.plotService.getLocation(this.locationId).subscribe(iloc => this.location = iloc)
            }
        })
    }

    save(form) {
        this.location.name = form.value.name;
        this.location.description = form.value.description

        this.storyService.createNewLocation(this.storyId,this.location);
        // subscribe({
        //     next: x => this.location = x,
        //     error: err => console.error('Observer got an error: ' + err),
        //     complete: () => this.storyService.addNewLocation(this.storyId,this.location)
        //         .subscribe(istory => this.plotService.currentStory.update(() => istory))
        // });
    }

    update(form){
        this.location.name = form.value.name;
        this.location.description = form.value.description;
        this.plotService.saveLocation(this.location).subscribe(location =>this.location=location);
    }

    link(form) {
        this.location.name = form.value.name;
        this.location.id = form.value.id;
        this.location.description = form.value.description
        this.plotService.linkLocation(this.eventId, this.location)
            .subscribe(ievent => this.router.navigate(['home', 'stories', 'story', this.storyId, 'plots']));
    }
}
