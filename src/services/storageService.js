// storageService.js
// Handles file/image uploads to Supabase Storage.
// src/services/storageService.js
import supabase from "./supabaseClient";

/**
 * Upload an image file to Supabase Storage
 * @param {File} file - Image file to upload
 * @returns {Promise<string>} Public URL of the uploaded file
 */
export async function uploadImage(file) {
	try {
		if (!file) {
			throw new Error("No file provided");
		}

		// Validate the file
		if (!file.type.startsWith("image/")) {
			throw new Error("Only image files are allowed");
		}

		// Generate a unique filename
		const fileExt = file.name.split(".").pop();
		const fileName = `${Date.now()}-${Math.random()
			.toString(36)
			.substring(2, 15)}.${fileExt}`;
		const filePath = `${fileName}`;

		// Upload to the image_bucket
		const { data, error } = await supabase.storage
			.from("image_bucket")
			.upload(filePath, file, {
				cacheControl: "3600",
				upsert: false,
			});

		if (error) {
			console.error("Error uploading image:", error);
			throw new Error(`Failed to upload image: ${error.message}`);
		}

		// Get the public URL
		const { data: publicUrlData } = supabase.storage
			.from("image_bucket")
			.getPublicUrl(filePath);

		if (!publicUrlData || !publicUrlData.publicUrl) {
			throw new Error("Failed to get public URL for uploaded image");
		}

		console.log("Image uploaded successfully:", publicUrlData.publicUrl);
		return publicUrlData.publicUrl;
	} catch (err) {
		console.error("Exception in uploadImage:", err);
		throw err;
	}
}
