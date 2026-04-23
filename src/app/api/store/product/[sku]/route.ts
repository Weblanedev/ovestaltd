import { NextResponse } from "next/server";
import { fetchDummyJsonProductById } from "@/lib/dummyjson";

type Params = { params: Promise<{ sku: string }> };

export async function GET(_req: Request, { params }: Params) {
  const { sku } = await params;
  if (!sku) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  try {
    const product = await fetchDummyJsonProductById(sku);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}
