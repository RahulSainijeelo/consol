/**
 * Upload image to ImgBB
 * @param file - The image file to upload
 * @returns Promise with image URL and delete URL
 */
export async function uploadImageToImgBB(file: File): Promise<{
    url: string;
    deleteUrl: string;
    displayUrl: string;
    thumbUrl: string;
}> {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
        throw new Error("ImgBB API key is not configured");
    }

    // Create FormData for the upload
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", apiKey);

    try {
        const response = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error?.message || "Upload failed");
        }

        return {
            url: data.data.url,
            displayUrl: data.data.display_url,
            thumbUrl: data.data.thumb.url,
            deleteUrl: data.data.delete_url,
        };
    } catch (error) {
        console.error("ImgBB upload error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to upload image"
        );
    }
}

/**
 * Delete image from ImgBB
 * Note: ImgBB doesn't provide a direct delete API, so we just remove the reference
 * The delete_url from ImgBB can be used manually by the user if needed
 */
export async function deleteImageFromImgBB(deleteUrl: string): Promise<void> {
    // ImgBB doesn't provide an API endpoint for deletion
    // The deleteUrl is meant to be opened in a browser
    // We'll just resolve immediately since we can't programmatically delete
    console.log("Image delete URL:", deleteUrl);
    return Promise.resolve();
}
