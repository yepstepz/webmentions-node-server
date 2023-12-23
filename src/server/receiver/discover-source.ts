import http from 'http';

type Params = {
  sourceURLObject: URL,
  targetURLObject: URL
}



export const discoverSource = async ({ sourceURLObject, targetURLObject}: Params) => {
  const req = await fetch(sourceURLObject.href)
    .then((res) => res.text());
  // validate
  return [req, sourceURLObject.hostname]
}