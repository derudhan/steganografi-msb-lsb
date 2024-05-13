import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class PanelSettingsService {
	constructor() {}

	showEmbedData: boolean = false;
	showExtractData: boolean = false;

	closePanels(): void {
		/*
		Used to close all panels on the image screen
		*/
		this.showEmbedData = false;
		this.showExtractData = false;
	}
}
