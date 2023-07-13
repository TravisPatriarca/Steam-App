import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  InsufficientRatingError,
  InsufficientReviewsError,
  NotGameTypeError,
  NotReleasedError,
  UnsuccessfulRequestError
} from "./errors/error";
import { getAllAppData } from "./utils/get-all-app-data";
import { getAppList } from "./utils/get-app-list";

const tryGetAppData = async (appId: number): Promise<number> => {
  const backedOff = false;
  try {
    const appData = await getAllAppData(appId);
    await setDoc(doc(db, `apps`, `${appData.appid}`), appData);
    return 1;
  } catch (error: any) {
    if (error instanceof UnsuccessfulRequestError) {
      console.log(`Game data does not exist`);
      mostRecent = `Game data does not exist`;
    } else if (error instanceof NotGameTypeError) {
      console.log(`Not a game`);
      mostRecent = `Not a game`;
    } else if (error instanceof NotReleasedError) {
      console.log(`Not released`);
      mostRecent = `Not released`;
    } else if (error instanceof InsufficientReviewsError) {
      console.log(`Not enough reviews`);
      mostRecent = `Not enough reviews`;
    } else if (error instanceof InsufficientRatingError) {
      console.log(`Poor rating`);
      mostRecent = `Poor rating`;
    } else {
      console.log(`Error: RATING LIMITED! Waiting ${backOff/1000} seconds before retrying...`);
      await new Promise(resolve => setTimeout(resolve, backOff));
      backOff *= 2;
      return await tryGetAppData(appId);
    }

    if (!backedOff) {
      backOff = minBackOff;
    }
    return 0;
  }
}

let mostRecent = ``
const minBackOff = 10000;
let backOff = 10000;
const main = async () => {
  let found = 0;
  let total = 0;

  const appIds: number[] = await getAppList();
  for (const appId of appIds) {
    console.clear();
    console.log(`Scanning steam apps (${total}/${appIds.length}) ${mostRecent} - ${found} added...`);
    total++;
    found += await tryGetAppData(appId);
  }
}

main()



