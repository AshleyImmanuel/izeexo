import Link from "next/link";

export const metadata = {
    title: "Privacy Policy | Izeexo",
    description: "How we handle your data at Izeexo.",
};

export default function PrivacyPage() {
    return (
        <main className="container" style={{ padding: "4rem 1rem", maxWidth: "800px" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "700" }}>Privacy Policy</h1>
            <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Last Updated: January 2026</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", lineHeight: "1.6" }}>
                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>2. How We Use Your Data</h2>
                    <p>Your data is used to process transactions, improve our services, and communicate with you about updates or offers. We do not sell your personal data to third parties.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>3. Cookies</h2>
                    <p>We use cookies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", fontWeight: "600" }}>4. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@izeexo.com" style={{ textDecoration: "underline" }}>contact@izeexo.com</a>.</p>
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
