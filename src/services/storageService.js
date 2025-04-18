// storageService.js
// Handles file/image uploads to Supabase Storage.
import supabase from "./supabaseClient";

// Upload an image file to Supabase Storage and return the public URL
export async function uploadImage(file, bucket = "images") {
	const filePath = `${Date.now()}_${file.name}`;
	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(filePath, file);
	if (error) throw error;

	// Get public URL
	const { publicURL, error: urlError } = supabase.storage
		.from(bucket)
		.getPublicUrl(filePath);
	if (urlError) throw urlError;
	return publicURL;
}
