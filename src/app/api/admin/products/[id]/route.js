import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);
        // Admin check is good but maybe we want to allow viewing for detail page? 
        // Admin api so assume strict.
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

        return NextResponse.json({
            ...product,
            price: product.price.toString()
        });

    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { title, description, price, categoryId, images, isFeatured } = data;

        const updateData = {};
        if (title) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (price) updateData.price = parseFloat(price);
        if (categoryId) updateData.categoryId = categoryId;
        if (images) updateData.images = images;
        if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

        const product = await prisma.product.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(product);

    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = await params;
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.product.update({
            where: { id },
            data: { isArchived: true }
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
