export type Author = {
    type: string
    name: string
    photo: string
    url: string
}

export type Mention = {
    type: string
    url: string
    published: string
    'wm-received': string
    'wm-id': number
    'wm-source': string,
    'wm-target': string
    'wm-protocol': 'webmention'
    'wm-property': 'in-reply-to' | 'like-of' | 'repost-of' | 'bookmark-of' | 'mention-of' | 'rsvp'
    'wm-private': boolean
    'in-reply-to'?: string
    'like-of'?: string
    'repost-of'?: string
    'bookmark-of'?: string
    'mention-of'?: string
    rsvp: string
    content: {
        text?: string
        html?: string
    }
    author: Author
}

export type Webmentions = {
    type: "feed",
    name: "Webmentions",
    children: Array<Mention>
}
