import { mf2 } from "microformats-parser";

export const parseSource = (res: Array<string>) => {
  // TODO
  const [html, baseUrl] = res;
  const TEST = 'http://kek'
  console.log(JSON.stringify(mf2(html, { baseUrl: TEST })))
}