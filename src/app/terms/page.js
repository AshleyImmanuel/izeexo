import Link from "next/link";

export const metadata = {
    title: "Terms of Service | Izeexo",
    description: "Terms and conditions for using Izeexo services.",
};

export default function TermsPage() {
    return (
        <main className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "700" }}>Terms of Service</h1>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Last Updated: January 2026</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: "1.6" }}>
                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>1. Introduction</h2>
                    <p>Welcome to Izeexo. By accessing our website and using our services, you agree to likely abide by these terms and conditions.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>2. Intellectual Property</h2>
                    <p>all content, designs, graphics, and logos on this site are the property of Izeexo unless otherwise stated. You may not reproduce or redistribute our work without permission.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>3. Purchases & Refunds</h2>
                    <p>Due to the digital nature of our products, all sales are final. Please review product details carefully before purchasing.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>4. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at <a href="mailto:contact@izeexo.com" style={{ textDecoration: "underline" }}>contact@izeexo.com</a>.</p>
                </section>
            </div>

            <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid #eee" }}>
                <Link href="/" style={{ textDecoration: "underline", color: "var(--text-muted)" }}>
                    &larr; Back to Home
                </Link>
            </div>
        </main>
    );
}
