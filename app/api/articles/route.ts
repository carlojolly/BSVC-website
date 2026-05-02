import { NextResponse } from "next/server";

export const revalidate = 1800;

const FEED_URL = "https://medium.com/feed/@as.bsventureclub";

type Article = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  thumbnail: string | null;
  author: string;
};

function pick(xml: string, tag: string): string | null {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  return m ? m[1] : null;
}

function unwrapCdata(s: string): string {
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function stripTags(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImage(html: string): string | null {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function parseFeed(xml: string): Article[] {
  const items: Article[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;
  while ((match = itemRe.exec(xml))) {
    const block = match[1];
    const title = stripTags(unwrapCdata(pick(block, "title") ?? ""));
    const link = stripTags(unwrapCdata(pick(block, "link") ?? ""));
    const pubDate = stripTags(unwrapCdata(pick(block, "pubDate") ?? ""));
    const author = stripTags(unwrapCdata(pick(block, "dc:creator") ?? ""));
    const contentEncoded = unwrapCdata(pick(block, "content:encoded") ?? "");
    const description = unwrapCdata(pick(block, "description") ?? "");
    const html = contentEncoded || description;
    const thumbnail = firstImage(html);
    const excerpt = stripTags(html).slice(0, 220);
    items.push({ title, link, pubDate, excerpt, thumbnail, author });
  }
  return items;
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 BSVC-site" },
      next: { revalidate: 1800 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { articles: [], error: `Upstream ${res.status}` },
        { status: 502 },
      );
    }
    const xml = await res.text();
    const articles = parseFeed(xml).filter(
      (a) =>
        !a.title
          .toLowerCase()
          .startsWith("european vc and its impact on innovation"),
    );
    return NextResponse.json({ articles });
  } catch (err) {
    return NextResponse.json(
      { articles: [], error: (err as Error).message },
      { status: 500 },
    );
  }
}
