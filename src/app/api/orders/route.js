import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId, quantity } = await req.json();

        if (!productId || !quantity) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const qty = parseInt(quantity);
        if (isNaN(qty) || qty < 1) {
            return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
        }

        // Fetch product to get price
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Calculate total amount
        // product.price is Decimal, we can use simple multiplication for now or .mul if needed
        const totalAmount = Number(product.price) * qty;

        // Find the user to get their ID (since session might not have it if not updated)
        // Actually session.user.email is reliable
        const user = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const order = await prisma.order.create({
            data: {
                userId: user.id,
                productId: product.id,
                quantity: qty,
                amount: totalAmount,
                status: "PENDING", // Default
            },
            include: {
                product: true
            }
        });

        return NextResponse.json({ success: true, order }, { status: 201 });

    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
