export async function fetchXRaySource ({ html }) {
    let formData = new FormData();
    formData.append('html', html);
    // formData.append('url', baseUrl);

    const response = await fetch ('https://xray.p3k.io/parse',{
        method: 'POST',
        body: formData
    })
    .then((data) => data.json())

    if (!response.ok) {
        // save to unsuccessfull
        return {}
    }
    const resJson = await response.json()
    if (resJson['data'] === undefined) {
        // save to unsuccessfull
        return {}
    }
    return resJson
}