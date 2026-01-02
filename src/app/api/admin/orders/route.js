import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: { name: true, email: true, image: true }
                },
                product: {
                    select: { title: true, price: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Add formatted date, total amount (if logic needed)
        const formattedOrders = orders.map(order => ({
            ...order,
            date: new Date(order.createdAt).toLocaleDateString(),
            amount: order.amount.toString() // Ensure decimal is string for frontend
        }));

        return NextResponse.json(formattedOrders);
    } catch (error) {
        console.error("Admin Order Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
