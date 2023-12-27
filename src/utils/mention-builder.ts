import {Mention} from "../type";
import {Mention as DBMention} from "@prisma/client";

export const mentionBuilder = (mention: Mention): Omit<DBMention, 'id' | 'authorId' | 'title'> => {
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

    return {
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

}