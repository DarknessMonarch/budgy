import { Open_Sans } from "next/font/google";
import { Toaster } from 'sonner';
import "@/app/styles/global.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});



const SITE_URL = "https://budgyapp.vercel.app/";
const BANNER_URL = "https://raw.githubusercontent.com/DarknessMonarch/budgy/refs/heads/master/public/assets/banner.png";

export const viewport = {
  themeColor: "#2D3748",
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Budgy - Budget tracking made easier",
    template: "%s , budgy"
  },
  applicationName: "budgy",
  description: "Manage your budgets well",
  authors: [{ name: "budgy", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "budgy",
    "finance",
    "money",
    "assets",
    "loan",
    "requisition",
    "bank",
    "budget",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Budgy - Budget made easier",
    description: "Manage your budgets well",
    url: SITE_URL,
    siteName: "budgy",
    images: [{
      url: BANNER_URL,
      width: 1200,
      height: 630,
      alt: "budgy Banner"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Budgy - Budget made easier",
    description: "Manage your budgets well",
    images: [BANNER_URL],
    creator: "@budgy"
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
  verification: {
    google: "",
    yandex: "",
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={openSans.className}>

      <body>
        <Toaster
          position="top-center"
          richColors={true}
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#26cf96",
              borderRadius: "15px",
              border: "1px solid #d8f7ec",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
