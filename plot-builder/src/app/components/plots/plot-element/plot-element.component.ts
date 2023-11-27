import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IPlot} from "../../../plot.model";

@Component({
  selector: 'app-plot-element',
  templateUrl: './plot-element.component.html',
  styleUrls: ['./plot-element.component.css']
})
export class PlotElementComponent {
  @Input() isActive = true;
  @Input() plot: IPlot;
  @Output() plotSave = new EventEmitter<IPlot>();

  save(form) {
    let edit = {
      name: form.name,
      id: this.plot.id,
      description: form.description,
      type: form.type,
      parentId: form.parentId
    }
    this.plotSave.emit(edit);
  }


  setActive(plot){

  }
}
