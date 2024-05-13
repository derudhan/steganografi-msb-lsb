import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EmbedDataService } from "../embed-data.service";
import { ImageService } from "../../common-services/image.service";
import { PanelSettingsService } from "src/app/common-services/panel-settings.service";
declare var download; //download.js, imported in angular.json file

@Component({
	selector: "download-embedded",
	template:
		'<button class="btn btn-info" (click)="download()">Unduh Gambar Baru</button>',
})
export class DownloadEmbeddedComponent implements OnInit {
	constructor(
		private embedService: EmbedDataService,
		private imageService: ImageService,
		private router: Router,
		private panelSettings: PanelSettingsService
	) {}

	ngOnInit() {
		// //If no image loaded, redirect back.
		if (!this.imageService.defaultImageData) {
			this.router.navigate(["/upload"]);
		}
	}

	download() {
		var fileName = this.imageService.fileName;
		this.embedService.embeddedCanvas.toBlob(function (blob) {
			download(blob, fileName, "image/png");
		});
		this.panelSettings.showEmbedData = false;
		this.imageService.rgba = null;
		this.router.navigate(["/upload"]);
	}
}
