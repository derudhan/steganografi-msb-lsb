import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ImageService } from "src/app/common-services/image.service";
import { HelpersService } from "src/app/common-services/helpers.service";
import { LsbOptionsService } from "src/app/embed-extract-data/lsb-options.service";
import { EmbedDataService } from "src/app/embed-extract-data/embed-data.service";

@Component({
	selector: "embed-panel",
	templateUrl: "./embed-panel.component.html",
})
export class EmbedPanelComponent implements OnInit {
	constructor(
		private router: Router,
		private imageService: ImageService,
		private helpers: HelpersService,
		private lsbOptions: LsbOptionsService,
		private embedService: EmbedDataService
	) {}

	embedComplete: boolean = false;
	inProgress: boolean = false;
	error: string;

	fileBinary: string;
	textInput: string;
	inputType: string = "Text";

	@ViewChild("canvasElement") public canvasElement: ElementRef;

	ngOnInit() {
		this.lsbOptions.currentTable = "embed";
		// //If no image loaded, redirect back.
		if (!this.imageService.defaultImageData) {
			this.router.navigate(["/upload"]);
		}
	}

	async startEmbed() {
		/*
			This function acts as an intermediary between the Embed Service's embed function, the options input and the image output.
		*/
		this.error = "";

		//Check data was entered
		var binary: string =
			this.inputType == "Text"
				? this.helpers.textToBin(this.textInput)
				: this.fileBinary;
		if (!binary) {
			this.error = "Tidak ada data yang masuk!";
			return;
		}

		//Compare size of data to number of cells chosen
		var numberOfBitsChosen = Object.values(this.lsbOptions.selectedBits).flat()
			.length;
		var spaceRequested = binary.length;
		var maxSpaceWithRequestedBits =
			numberOfBitsChosen * this.imageService.r.length;
		if (spaceRequested > maxSpaceWithRequestedBits) {
			var requiredSpace = Math.ceil(
				spaceRequested / this.imageService.r.length
			);
			if (requiredSpace > 24) {
				this.error = `Tidak cukup ruang: Data yang diminta terlalu besar untuk dimasukkan ke gambar. Maximumnya adalah ${
					24 * this.imageService.r.length
				} bits.`;
			} else {
				this.error = `Tidak cukup ruang: Pilih setidaknya ${requiredSpace} sel untuk sepenuhnya menyisipkan data tersebut.`;
			}
			this.error += ` Untuk sekarang akan dipotong ke ${maxSpaceWithRequestedBits} bits.`;
		}

		//Show loading text
		this.inProgress = true;
		this.embedComplete = false;
		this.embedService.loadingMessage = "0%";
		await this.helpers.sleep(0);

		//Get new image
		var outputImage: ImageData = await this.embedService.embed(
			binary,
			this.lsbOptions.selectedBits,
			this.lsbOptions.pixelOrder,
			this.lsbOptions.bitOrder,
			this.lsbOptions.bitPlaneOrder,
			this.lsbOptions.padBits == "Iya"
		);

		//Display new image on canvas
		this.embedService.embeddedCanvas = this.canvasElement.nativeElement;
		let ctx = this.embedService.embeddedCanvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		this.embedService.embeddedCanvas.width = this.imageService.width;
		this.embedService.embeddedCanvas.height = this.imageService.height;
		ctx.putImageData(outputImage, 0, 0);

		this.inProgress = false;
		this.embedComplete = true;
	}

	uploadFile(input: any) {
		/*
      This is used to handle the file upload feature.
      The binary string taken from the file is stored in the toEmbed attribute
    */
		if (input.target.files[0]) {
			var file: File = input.target.files[0];
			var byteReader: FileReader = new FileReader();
			byteReader.onload = (event: Event) => {
				var inputData: Uint8Array = new Uint8Array(
					byteReader.result as ArrayBuffer
				);
				var inputBytes: string[] = Array.from(inputData).map((b) =>
					String.fromCharCode(b)
				);
				this.fileBinary = this.helpers.textToBin(inputBytes);
			};
			byteReader.readAsArrayBuffer(input.target.files[0]);
		}
	}
}
