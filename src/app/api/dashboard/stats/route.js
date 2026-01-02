import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: {
                orders: {
                    orderBy: { createdAt: "desc" },
                    take: 5
                },
                customRequests: {
                    orderBy: { createdAt: "desc" },
                    take: 5
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const stats = {
            totalOrders: user.orders.length,
            activeProjects: user.customRequests.filter(r => r.status === "IN_PROGRESS").length,
            completedProjects: user.customRequests.filter(r => r.status === "COMPLETED").length
        };

        const recentActivity = [
            ...user.orders.map(order => ({
                type: "order",
                title: `Order #${order.id.slice(0, 8)}`,
                status: order.status,
                time: new Date(order.createdAt).toLocaleDateString()
            })),
            ...user.customRequests.map(request => ({
                type: "project",
                title: request.designType,
                status: request.status,
                time: new Date(request.createdAt).toLocaleDateString()
            }))
        ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5);

        return NextResponse.json({ stats, recentActivity });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
