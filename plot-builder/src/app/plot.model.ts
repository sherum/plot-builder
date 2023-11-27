export interface IPlot {
  name: string;
  id?: string;
  description?: string;
  type?: string;
  parentId?: string;
  subplots?: IPlot[];
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

export const defaultPlots = [
  {
    "description": "An investigation into a specious air disaster creates more questions than it answers as the evidence pushes  progressively more inexplicable root causes.",
    "id": "AA",
    "name": "main plot",
    "parentId": "AA",
    "type": "story",
    "subplots": [
      {
        "description": "Felcia's boss puts her in charge of the investigaton knowing she is unhinged.",
        "id": "AAA",
        "name": "Act 1",
        "parentId": "AA",
        "subplots": [
          {
            "description": "Establish Felicia is crazy/PTSD coming off her last job.",
            "id": "AAAA",
            "name": "PROT development",
            "parentId": "AAA",
            "type": "arc",
            "subplots": []
          }
        ]
      }
    ]
  }
]
