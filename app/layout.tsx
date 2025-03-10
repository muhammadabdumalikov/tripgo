import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "TripGo - Your Travel Companion",
  description: "Discover and book amazing tours and travel experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <ProtectedRoute>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow">
                  {children}
                </main>
              </div>
            </ProtectedRoute>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
