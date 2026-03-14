import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function parseToDate(dateStr: string): Date | null {
  let year: number | null = null;
  let month: number | null = null;

  if (dateStr.match(/^\d{4}-\d{2}$/)) {
    const parts = dateStr.split("-");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  } else if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const parts = dateStr.split("-");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  } else if (dateStr.match(/^\d{4}\.\d{2}$/)) {
    const parts = dateStr.split(".");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  } else if (dateStr.match(/^\d{4}\/\d{2}$/)) {
    const parts = dateStr.split("/");
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
  }

  if (year !== null && month !== null) {
      return new Date(Date.UTC(year, month - 1, 1));
  }
  return null;
}

export function formatDateString(dateStr: string | undefined, locale: string = "vi"): string {
  if (!dateStr) return "";

  if (dateStr.includes(" - ")) {
    const [start, end] = dateStr.split(" - ");
    return `${formatDateString(start, locale)} - ${formatDateString(end, locale)}`;
  }

  const date = parseToDate(dateStr);
  if (!date) return dateStr;

  try {
      if (locale === "vi") {
          return `${date.getUTCFullYear()}/${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
      }
      const formatter = new Intl.DateTimeFormat(locale, { 
          year: 'numeric', 
          month: '2-digit',
          timeZone: 'UTC' 
      });
      return formatter.format(date);
  } catch (e) {
      return dateStr;
  }
}
/**
 * Prevents common Vietnamese compound words and suffixes from being split across lines.
 * Replaces regular spaces with non-breaking spaces (NBSP) in specific phrases.
 */
export function hardenVietnamese(text: string): string {
    if (!text || typeof text !== "string") return text;

    // Common Vietnamese compound words/prefixes that should stay together
    const phrases = [
        "Công ty", "Công nghệ", "Trưởng nhóm", "Chuyên viên", "Kỹ sư",
        "Nhân viên", "Giám đốc", "Quản lý", "cao cấp", "Dự án",
        "Đại học", "Cao đẳng", "Học viện", "Hệ thống", "Phát triển",
        "Phân tích", "Giáo dục", "Kỹ thuật", "Kinh doanh"
    ];

    let result = text;
    phrases.forEach(phrase => {
        const parts = phrase.split(' ');
        if (parts.length === 2) {
            const regex = new RegExp(`(${parts[0]}) (${parts[1]})`, 'gi');
            result = result.replace(regex, `$1\u00A0$2`);
        }
    });

    // Also avoid orphans by ensuring the last two words stay together
    // Only if the string isn't too long already
    if (result.includes(' ') && result.length < 50) {
        result = result.replace(/ (\S+)$/, "\u00A0$1");
    }

    return result;
}
