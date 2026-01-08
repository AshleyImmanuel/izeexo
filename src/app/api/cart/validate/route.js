
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { itemIds } = await req.json();

        if (!itemIds || !Array.isArray(itemIds)) {
            return NextResponse.json({ validIds: [] }, { status: 400 });
        }

        if (itemIds.length === 0) {
            return NextResponse.json({ validIds: [] });
        }

        // Fetch products that exist in the database from the list of IDs
        const existingProducts = await prisma.product.findMany({
            where: {
                id: {
                    in: itemIds
                }
            },
            select: {
                id: true
            }
        });

        const validIds = existingProducts.map(p => p.id);

        return NextResponse.json({ validIds });
    } catch (error) {
        console.error("Cart validation error:", error);
        return NextResponse.json({ error: "Failed to validate cart" }, { status: 500 });
    }
}
