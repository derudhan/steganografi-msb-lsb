import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ImageService } from "../common-services/image.service";
import { HelpersService } from "../common-services/helpers.service";
import { PanelSettingsService } from "../common-services/panel-settings.service";

@Component({
	selector: "app-imagemenu",
	templateUrl: "./imagemenu.component.html",
	styleUrls: ["./imagemenu.component.scss"],
})
export class ImageMenuComponent implements OnInit {
	constructor(
		private router: Router,
		private imageService: ImageService,
		private helpers: HelpersService,
		private panelSettings: PanelSettingsService
	) {}

	drawImageData: ImageData;

	ngOnInit() {
		if (!this.imageService.defaultImageData) {
			this.router.navigate(["/upload"]);
		}
	}

	reset() {
		/*
				Used to reset the image back to its original colour values
			*/
		this.panelSettings.closePanels();
		this.updateCanvas(this.imageService.defaultImageData);
	}

	updateCanvas(imageData: ImageData) {
		/*
			Subcomponents (i.e. bitplane browser) use this to control the canvas.
			This function acts as an intermediary between these subcomponents and the imagecanvas component.
		*/
		this.drawImageData = imageData;
	}

	toggleEmbedDataPanel() {
		/*
			Used to show/hide the Embed panel.
		*/
		var setFlag = this.panelSettings.showEmbedData;
		this.reset();
		if (!setFlag) this.panelSettings.showEmbedData = true;
	}

	toggleExtractDataPanel() {
		/*
			Used to show/hide the Extract panel.
		*/
		var setFlag = this.panelSettings.showExtractData;
		this.reset();
		if (!setFlag) this.panelSettings.showExtractData = true;
	}
}
