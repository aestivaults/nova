import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
interface CloudinaryResult {
  public_id: string;
  bytes: number;
  format: string;
  resource_type: string;
  secure_url: string;
}
export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.startsWith("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }
    if (
      !["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type
      )
    ) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 415 });
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult: CloudinaryResult = await new Promise(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryResult);
          }
        );
        stream.end(buffer);
      }
    );
    // Double-check Cloudinary-reported size & type
    if (uploadResult.bytes > 5 * 1024 * 1024) {
      await cloudinary.uploader.destroy(uploadResult.public_id);
      return NextResponse.json(
        { error: "File too large after upload" },
        { status: 413 }
      );
    }
    if (
      !["jpg", "jpeg", "png", "webp"].includes(
        uploadResult.format.toLowerCase()
      )
    ) {
      await cloudinary.uploader.destroy(uploadResult.public_id);
      return NextResponse.json({ error: "Invalid file type" }, { status: 415 });
    }
    return NextResponse.json(uploadResult);
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Failed to upload file";
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
