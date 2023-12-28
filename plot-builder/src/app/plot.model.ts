export interface IEvent{
  id:string;
  name:string;
  dtg:string;
  type?:string;
  location?:string;
  description?:string;
}

import {DEFAULT_ID} from "./index";

export interface IPlot {
  name: string;
  id?: string;
  parentId?:string;
  description?: string;
  type?: string;
  subplots?: IPlot[];
  events?:IEvent[];
  scenes?:[];
}

export interface IScene {
  id: string;
  dtg: string;
  name: string;
  setting: string;
  plotPoints:string;
  summary: string;
  location:string;
  things:[];
  events:[];
  people:[]
  plot:IPlot;
}



export interface IStory {
  id: string;
  author: string;

  title: string;

  genre: string;

  maguffin: string;

  summary: string;

  plots: Array<IPlot|null>;
  scenes: Array<IScene|null>;
}

export const defautStory:IStory = {
  "id":"A",
  "author": "new author",
  "title": "new title",
  "genre": "new genre",
  "maguffin": "new maguffin",
  "summary": "new summary",
  "plots": new Array<IPlot>(),
  "scenes": new Array<IScene>()
}
export const defautEvents:IEvent[] =[{

  "description": "New event",
  "id": DEFAULT_ID,
  "dtg":"22 Jun 2026: 1400",
  "name": "Test Anomaly",
  "type": "incident"
}]

export const defaultPlots:IPlot[] = [
  {
    "description": "An investigation into a specious air disaster creates more questions than it answers as the evidence pushes  progressively more inexplicable root causes.",
    "id": "AA",
    "name": "main plot",
    "type": "story",
    "subplots": [
      {
        "description": "Felcia's boss puts her in charge of the investigaton knowing she is unhinged.",
        "id": "AAA",
        "name": "Act 1",
        "subplots": [
          {
            "description": "Establish Felicia is crazy/PTSD coming off her last job.",
            "id": "AAAA",
            "name": "PROT development",

            "type": "arc",
            "subplots": []
          }
        ]
      }
    ]
  }
]
