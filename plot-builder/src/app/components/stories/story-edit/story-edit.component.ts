import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../../plot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {defautStory, IStory} from "../../../plot.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-story-edit',
  templateUrl: './story-edit.component.html',
  styleUrls: ['./story-edit.component.css']
})

export class StoryEditComponent implements OnInit {

  story: IStory = defautStory;
  new = true;

  constructor(private plotService: PlotService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.new = params['new'];
        if (!this.new) {
          this.route.params.subscribe(
            data => {
              let id = data['id'];
              this.plotService.getStory(id).subscribe(storee => this.story = storee);

            }
          )
        }
        // else {
        //   this.story = defautStory
        // }
      }
    );
  }


  save(form: NgForm) {
    this.story.author = form.value.author;
    this.story.title = form.value.title;
    this.story.genre = form.value.genre;
    this.story.maguffin = form.value.maguffin;
    this.story.summary = form.value.summary;
    this.story.id = '94423984-fb5c-44fb-ba5e-6d3bb6737ba3';
    console.log("story data after mapping:",this.story);
    this.plotService.updateCurrentStory(this.story);
    this.plotService.saveStory();
    this.router.navigate(['stories']);
  }


  update() {
    this.plotService.updateCurrentStory(this.story);
    this.plotService.updateStory(this.story.id);
    this.router.navigate(['stories']);
  }
}
