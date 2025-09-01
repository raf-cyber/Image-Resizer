import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const width = searchParams.get("width");
    const height = searchParams.get("height");
    const format = searchParams.get("format") || "jpeg";
    const quality = parseInt(searchParams.get("quality") || "90", 10);

    const buffer = Buffer.from(await req.arrayBuffer());

    const newBuffer = await sharp(buffer)
      .resize(
        width ? parseInt(width, 10) : undefined,
        height ? parseInt(height, 10) : undefined,
        { fit: "inside" }
      )
      .toFormat(format as keyof sharp.FormatEnum, { quality })
      .toBuffer();

    return new NextResponse(new Uint8Array(newBuffer), {
      headers: {
        "Content-Type": `image/${format}`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Sharp resize error:", err);
    return NextResponse.json(
      { error: "Failed to resize image" },
      { status: 500 }
    );
  }
}
