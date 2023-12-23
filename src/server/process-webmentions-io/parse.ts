export const parse = async ({ secret }) => {
    if (process.env.SECRET_WEBMENTIONS_IO !== secret) {
        throw new Error ('Wrong secret key! Did you forgot to provide a secret?');
    }

    const webmentions = await fetch(process.env.WEBMENTIONS_URL)
        .then((res) => res.json());

    return webmentions

}