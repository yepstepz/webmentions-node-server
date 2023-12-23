export const isURLValid = (url: string): URL => {
  let URLconstructor;
  try {
    URLconstructor = new URL(url);

    if (!['http:', 'https:'].includes(URLconstructor.protocol)) {
      throw new Error(`Protocol is not valid! Check your parameters, https or http was expected`);
    }

    // if (['localhost', '127.0.0.1', '0.0.0.0'].includes(URLconstructor.hostname)) {
    //   throw new Error(`Hostname is probably localhost! Check your parameters, proper hostname was expected`);
    // }

  } catch (error) {
    throw new Error(error);
  }

  return URLconstructor
}