		


import { Component, VERSION } from "@angular/core";
import { saveAs } from "file-saver";
import * as JSZip from 'jszip';


@Component({
  selector: "content-helper",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "BYJU'S Lab Content Helper"
  diagramTitle = '';
  simulationTitle = '';
  uploadFiles: any;
  thumbnailImage : any;
  labelledImage : any;
  greyscaleImage : any;
  simulationImage : any;
  dataFile: any;
  manifestFile: any;

  /*handleFileInput(files: any) {
    this.uploadFiles = files;
  }*/

  onThumbnailFileChanged(event: any) {
    this.thumbnailImage = event.target.files[0];
  }

  onLabelledFileChanged(event: any) {
    this.labelledImage = event.target.files[0];
  }

  onGreyscaleFileChanged(event: any) {
    this.greyscaleImage = event.target.files[0];
  }

  onSimulationThumbnailFileChanged(event:any){
    this.simulationImage = event.target.files[0];
  }

  onDataFileChanged(event:any){
    this.dataFile = event.target.files[0];
  }

  onManifestFileChanged(event:any){
    this.manifestFile = event.target.files[0];
  }

  downloadDiagramZip = async () => {
    const zip = new JSZip();

    var folderName = this.diagramTitle;

    // @ts-ignore: Object is possibly 'null'.
    zip.folder("thumbnail").file("thumbnail_" + folderName + ".png", this.thumbnailImage);
    //@ts-ignore: Object is possibly 'null'.
    zip.folder("labelled").file("labelled_" + folderName + ".png", this.labelledImage);
    //@ts-ignore: Object is possibly 'null'.
    zip.folder("greyscale").file("greyscale_" + folderName + ".png", this.greyscaleImage);

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content,  folderName + ".zip");
    });
      
  };

  downloadSimulationZip = async () => {
    const zip = new JSZip();

    var folderName = this.simulationTitle;

    // @ts-ignore: Object is possibly 'null'.
    zip.folder("thumbnail").file("thumbnail_" + folderName + ".png", this.thumbnailImage);
    //@ts-ignore: Object is possibly 'null'.
    zip.folder("simulation").file(this.dataFile.name, this.dataFile);
    //@ts-ignore: Object is possibly 'null'.
    zip.folder("simulation").file(this.manifestFile.name, this.manifestFile);

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content,  folderName + ".zip");
    });
      
  };

}

