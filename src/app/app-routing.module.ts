import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UploadComponent } from "./upload/upload.component";
import { ImageMenuComponent } from "./imagemenu/imagemenu.component";

const routes: Routes = [
	{ path: "", redirectTo: "/upload", pathMatch: "full" },
	{ path: "upload", component: UploadComponent },
	{ path: "image", component: ImageMenuComponent },
	{ path: "**", redirectTo: "/upload" }, // If 404, redirect back to upload screen
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
