import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

/* Original Upload Page */
import { UploadComponent } from "./upload/upload.component";

/* Image option menu */
import { ImageMenuComponent } from "./imagemenu/imagemenu.component";

/* Image canvas (child of ImageMenuComponent) */
import { ImageCanvasComponent } from "./imagemenu/imagecanvas/imagecanvas.component";

/* Bit Table (child of Extract/Embed menu components) */
import { LsbTableComponent } from "./embed-extract-data/lsb-table/lsb-table.component";

/* LSB Settings (child of Extract/Embed menu components) */
import { LsbSettingsComponent } from "./embed-extract-data/lsb-settings/lsb-settings.component";

/* Download Buttons (child of Extract/Embed menu components) */
import { DownloadEmbeddedComponent } from "./embed-extract-data/downloadembedded/downloadembedded.component";

// Panel Tambahan
import { EmbedPanelComponent } from "./imagemenu/embed-panel/embed-panel.component";
import { ExtractPanelComponent } from "./imagemenu/extract-panel/extract-panel.component";

@NgModule({
	declarations: [
		AppComponent,
		UploadComponent,
		ImageMenuComponent,
		ImageCanvasComponent,
		LsbTableComponent,
		LsbSettingsComponent,
		DownloadEmbeddedComponent,
		EmbedPanelComponent,
		ExtractPanelComponent,
	],
	imports: [BrowserModule, FormsModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
