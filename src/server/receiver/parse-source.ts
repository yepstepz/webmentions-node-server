import { verifySender } from "../../utils/verify-sender";
import { fetchXRaySource } from "../../utils/x-ray-source";

export const parseSource = async (res: Array<string>, { targetURLObject }) => {
  // TODO
  const [html] = res;

  if (!verifySender({ html, target: targetURLObject.href })) {
    throw new Error('Could not find a ny mention of target recource. Did you forget to include it?');
  }

  return await fetchXRaySource({ html });
}