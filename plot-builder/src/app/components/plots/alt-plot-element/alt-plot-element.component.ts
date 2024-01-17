import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IEvent, IPlot} from "../../../plot.model";
import {DEFAULT_ID} from "../../../index";
import {Location} from "@angular/common";
import {HttpCacheService} from "../../../http-cache.service";
import {StoryService} from "../../../story.service";

@Component({
    selector: 'app-alt-plot-element',
    templateUrl: './alt-plot-element.component.html',
    styleUrls: ['./alt-plot-element.component.css']
})
export class AltPlotElementComponent implements OnInit {
    plot: IPlot;
    //   = {
    //   name: 'new',
    //   type: 'Character',
    //   description: 'plot description',
    //   id: "new",
    // };
    events: IEvent[];
    storyId = "";
    plotId = "";

    constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router, private location: Location, private cacheService: HttpCacheService,private storyService:StoryService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.plotId = params['plotId'];
            this.storyId = params['id'];
            if (this.plotId == 'new') {
                this.plot = {
                    name: 'new',
                    type: 'Character',
                    description: 'plot description',
                    id: "new",

                };
            } else {
                this.plotService.getPlot(this.plotId).subscribe(iplot => {
                    this.plot = iplot;
                    this.events = iplot.events;
                    console.log("this plot", this.plot);
                });
            }
        });
    }


    createSubplot() {
        let subplot: IPlot = {
            name: 'new',
            id: DEFAULT_ID,
            type: 'child plot',
            parentId: this.plotId,
            description: ' new description'
        }
        this.plotService.savePlot(this.plotId, subplot).subscribe(iplot => {
            this.router.navigate(['home', 'stories', 'story', this.storyId, 'plots', iplot.id]);

        });
    }

    save(form) {
        this.plot.name = form.value.name;
        this.plot.type = form.value.type;
        this.plot.description = form.value.description
        if (this.plot.id == 'new') {
            this.plot.id = DEFAULT_ID;
            this.storyService.saveTopPlot(this.storyId, this.plot);
        } else {
            this.plotService.savePlot(this.plot.parentId, this.plot).subscribe(
                plotted => {
                    this.router.navigate(['home', 'stories', 'story', this.storyId, 'plots']);
                    this.cacheService.invalidateCache();
                }
            );
        }
    }


    deletePlot(pid: string) {
        this.plotService.deletePlot(pid);
        this.router.navigate(['home', 'stories', 'story', this.storyId, 'plots']);
    }

    createEvent() {
        this.plotService.saveEvent(this.plotId, this.plot).subscribe(iplot => {
            this.plot = iplot
        })
    }

    selectEvent(event) {
        this.router.navigate(['home', 'stories', 'story', this.storyId, 'plots', this.plotId, event.id]);
    }
}

