"use server";
import cloudinary from "./cloudinary";

type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
  url: string;
  asset_id?: string;
};

export default async function uploadImage(image: File, folder: string) {
  const imageBuffer = await image.arrayBuffer();
  const imageToUpload = Buffer.from(imageBuffer);

  const imageUploadResult: CloudinaryUploadResult = await new Promise(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error || !result)
              return reject(error || new Error("Upload failed"));
            resolve(result);
          }
        )
        .end(imageToUpload);
    }
  );

  return imageUploadResult.secure_url;
}

function hasStatusCode(err: unknown): err is { statusCode: number } {
  return typeof err === "object" && err !== null && "statusCode" in err;
}

export async function retryUploadImage(
  file: File,
  folder: string,
  retries = 3,
  delayMs = 1000
): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await uploadImage(file, folder);
    } catch (error: unknown) {
      const isLastAttempt = attempt === retries;

      let message = "Unknown error";
      let statusCode: number | undefined;

      if (error instanceof Error) {
        message = error.message;
      }

      if (hasStatusCode(error)) {
        statusCode = error.statusCode;
      }

      console.warn(`Upload attempt ${attempt} failed`, error);

      const isRecoverable =
        statusCode === 499 ||
        message.includes("timeout") ||
        message.includes("stream disconnected");

      if (!isRecoverable || isLastAttempt) {
        throw error;
      }

      await new Promise((res) => setTimeout(res, delayMs * attempt));
    }
  }

  throw new Error("Upload failed after multiple attempts.");
}
