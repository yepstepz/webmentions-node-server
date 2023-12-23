import { prisma } from "../../prisma/client";
import { Mention as DBMention, User } from '@prisma/client'

type Author = {
    type: string
    name: string
    photo: string
    url: string
}

type Mention = {
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

type Webmentions = {
    type: "feed",
    name: "Webmentions",
    children: Array<Mention>
}

const mentionBuilder = (mention: Mention): Omit<DBMention, 'id' | 'authorId' | 'title'> => {
    const {
        'wm-received': wmReceived,
        'wm-id': wmId,
        'wm-source': wmSource,
        'wm-target': wmTarget,
        'wm-protocol': wmProtocol,
        'wm-property': wmProperty,
        'wm-private': wmPrivate,
        'in-reply-to': inReplyTo,
        'like-of': likeOf,
        'repost-of': repostOf,
        'bookmark-of': bookmarkOf,
        'mention-of': mentionOf,
        content: {text: contentText, html: contentHTML},
        ...rest
    } = mention;

    const parsedMention = {
        wmReceived,
        wmId,
        wmSource,
        wmTarget,
        wmProtocol,
        wmProperty,
        wmPrivate,
        inReplyTo,
        likeOf,
        repostOf,
        bookmarkOf,
        mentionOf,
        contentText,
        contentHTML,
        ...rest
    }

    return parsedMention
}

export const processWebmentions = async (data: Webmentions) => {
    const mentions: Array<Mention> = data?.children || [];

    for (let i = 0; i < mentions.length; i++) {
        const { author } = mentions[i];

        const { author: _, ...restMention } = mentionBuilder(mentions[i]);

        const mentionsCreation = {
            connectOrCreate: {
                where: {
                    wmId: restMention.wmId,
                },
                create: {
                    ...restMention
                }
            }
        }

        await prisma.user.upsert({
            where: {
                url: author.url
            },
            create: {
                ...author,
                mentions: mentionsCreation
            },
            update: {
                name: author.name,
                photo: author.photo,
                mentions: mentionsCreation
            }
        })

        await prisma.mention.update({
            where: {
                url: restMention.url
            },
            data: {
                ...restMention
            }
        })
    }
    return 'Success!'
}