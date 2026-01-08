import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });

        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name } = await req.json();

        if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

        // Simple slug generation
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const category = await prisma.category.create({
            data: { name, slug }
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        // Handle unique constraint violation
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Category already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }
}
