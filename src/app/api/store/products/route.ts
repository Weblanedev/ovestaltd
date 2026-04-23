import { NextResponse } from "next/server";
import { isProductCategorySlug } from "@/lib/categories";
import { fetchDummyJsonProducts } from "@/lib/dummyjson";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("pageSize") ?? "12", 10) || 12)
  );
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const categorySlug =
    category && isProductCategorySlug(category) ? category : undefined;

  try {
    const result = await fetchDummyJsonProducts({
      page,
      pageSize,
      q,
      categorySlug,
    });
    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load products" },
      { status: 500 }
    );
  }
}
