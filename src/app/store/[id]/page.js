import prisma from "@/lib/prisma";
import ProductDetails from "@/components/store/ProductDetails";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id: id },
    });

    if (!product) {
        return {
            title: "Product Not Found | Izeexo",
        };
    }

    return {
        title: `${product.title} | Izeexo Store`,
        description: product.description,
    };
}

export default async function ProductPage({ params }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id: id },
        include: {
            category: true, // If you want category name, though schema has categoryId and category relation
        }
    });

    if (!product) {
        notFound();
    }

    // Transform product if necessary, or pass as is.
    // ProductDetails expects product object with images array.
    // Schema has 'images' as String[], 'category' as object (if included)
    // We can flatten category if needed, but ProductDetails uses product.category which might be expected to be a string based on previous mock data.
    // Mock data had category: "Logo Design". 
    // Prisma result will have category object { name: "Logo Design" ... }
    // Let's normalize it.

    const serializedProduct = {
        ...product,
        price: Number(product.price), // Decimal to Number
        category: product.category?.name || "Uncategorized", // Extract name
    };

    return <ProductDetails product={serializedProduct} />;
}
