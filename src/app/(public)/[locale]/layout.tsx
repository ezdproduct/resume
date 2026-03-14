import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "@/lib/navigation";
import { NextIntlClientProvider } from "@/i18n/compat/client";
import {
  getMessages,
  getTranslations,
  setRequestLocale
} from "@/i18n/compat/server";
import Document from "@/components/Document";
import { locales, type Locale } from "@/i18n/config";
import { Providers } from "@/app/providers";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: locale as Locale, namespace: "common" });
  const baseUrl = "https://magicv.art";

  return {
    title: t("title") + " - " + t("subtitle"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}/${locale}`
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale,
      alternateLocale: locale === "en" ? ["vi"] : ["en"]
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  setRequestLocale(locale as Locale);

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <Document locale={locale as Locale}>
      <NextIntlClientProvider messages={messages} locale={locale as Locale}>
        <Providers>{children}</Providers>
      </NextIntlClientProvider>
    </Document>
  );
}
