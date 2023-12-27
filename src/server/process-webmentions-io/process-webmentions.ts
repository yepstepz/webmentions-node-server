import {prisma} from "../../prisma/client";
import {Mention, Webmentions} from "../../type";
import {mentionBuilder} from "../../utils/mention-builder";

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