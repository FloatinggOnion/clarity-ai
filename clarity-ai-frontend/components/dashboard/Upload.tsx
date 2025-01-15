"use client";

import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { UploadIcon } from "@radix-ui/react-icons";
import { IconLoader, IconUpload } from "@tabler/icons-react";
import { IconFileUpload } from "@tabler/icons-react";
import { scrape } from "@/convex/ingest/load";

type Props = {};

const Upload = (props: Props) => {
	const [url, setUrl] = useState(null);
	const [file, setFile] = useState<File | null>(null);
	const [isUploaded, setIsUploaded] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = Object.fromEntries(new FormData(e.currentTarget));

		console.log("Submitted data: ", data);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			// Handle the selected file(s) here
			if (files[0].type === "application/pdf") {
				// console.log(files[0]);
				setFile(files[0]);
				console.log("uploading file now");
				// handleSubmit(event, files[0]);
			} else {
				alert("Please upload a PDF file.");
			}
		}
	};

	const handleDivClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	// const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
	// 	e.preventDefault();
	// 	const droppedFile = e.dataTransfer.files[0];
	// 	if (droppedFile && droppedFile.type === "application/pdf") {
	// 		setFile(droppedFile);

	// 		handleSubmit(e, droppedFile);
	// 	} else {
	// 		alert("Please upload a PDF file.");
	// 	}
	// };

	const handleUploadNewFile = () => {
		setFile(null);
		setIsUploaded(false);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<div className="py-5 px-2 my-5 flex flex-col space-y-6 bg-neutral-100 rounded-lg">
            <Form
                className="w-full flex flex-col gap-4"
                validationBehavior="native"
                onSubmit={handleSubmit}
            >
                <Input
                    isRequired
                    errorMessage="Please enter a valid url"
                    label="URL"
                    labelPlacement="outside"
                    name="url"
                    placeholder="Enter the url to your website or docs"
                    type="url"
                    className="w-full border-2 rounded border-neutral-500 border-dashed"
                />

                <Button
                    type="submit"
                    className="w-full"
                    endContent={<IconUpload size={20} />}
                >
                    <p className="font-semibold">Upload URL</p>
                </Button>
            </Form>

			<div className="text-center">
				<h3 className="text-lg font-semibold uppercase">Or</h3>
				<p className="">Upload a document</p>
			</div>

			{!file && (
				<div
					className="bg-neutral-200 p-4 md:p-10 rounded-2xl text-center my-6 border-dashed border-2 border-neutral-500 cursor-pointer"
					onClick={handleDivClick}
					onDragOver={handleDragOver}
					// onDrop={handleDrop}
				>
					<p>
						<span>
							Select resume to Upload
							<br />
						</span>{" "}
						or drag and drop file
					</p>
					<div className="flex flex-col items-center my-2">
						<IconUpload className="text-5xl" />
						<button className="upload-button">Upload</button>
					</div>
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						onChange={handleFileChange}
					/>
				</div>
			)}
			{file && (
				<IconLoader
					// loading={!isUploaded}
					size={100}
					aria-label="Loading Spinner"
				/>
			)}
			{file && isUploaded && (
				<p className="bg-neutral-200 text-lg md:text-xl border-2 border-dashed border-neutral-500 p-2 rounded-lg text-center">
					File Uploaded Successfully! <br />
					<span className="text-xs">
						Worried about your data? <br /> Your resume is deleted
						10 minutes after you get your review
					</span>
				</p>
			)}
		</div>
	);
};

export default Upload;
