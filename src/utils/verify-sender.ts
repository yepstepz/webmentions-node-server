import * as cheerio from 'cheerio';

type Props = {
    html: string
    target: string
}

export function verifySender ({ html, target }: Props): boolean {
    const $ = cheerio.load(html);
    return $('a[href*="' + target + '"], img[src*="' + target + '"], video[src*="' + target + '"]').length > 0;
}