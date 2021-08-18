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
  title = '';
  uploadFiles: any;
  thumbnailImage : any;
  labelledImage : any;
  greyscaleImage : any;

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


  download = async () => {
    const zip = new JSZip();

    var folderName = this.title;

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
}
