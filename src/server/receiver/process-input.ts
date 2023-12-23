import { isURLValid } from "../../utils/validate-url.js";

type Props = {
  source: string,
  target: string
}

export const processInput = ({ source, target }: Props) => {
  try {
    const targetURLObject = isURLValid(target);
    const sourceURLObject = isURLValid(source);

    if (targetURLObject.origin !== process.env.TARGET) {
      throw new Error(`Target's origin was not ${process.env.TARGET}! Check your parameters!`);
    }

    if (
      targetURLObject.origin === sourceURLObject.origin &&
      targetURLObject.pathname === sourceURLObject.pathname
    ) {
      throw new Error('Source and target are the same! Check your parameters!');
    }

    return {sourceURLObject, targetURLObject};

  } catch (e) {
    throw new Error (e);
  }
}