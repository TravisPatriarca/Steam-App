import { NotGameTypeError, NotReleasedError, UnsuccessfulRequestError } from "../errors/error";

interface AppScreenshot {
  id: number
  pathThumbnail: string
  pathFull: string
}

interface AppData {
  name: string
  type: string
  releaseDate: {
    comingSoon: boolean
    date: string
  }
  priceOverview: {
    isFree: boolean
    currency: string
    discount: number
    initial: number
    final: number
  }
  screenshots: AppScreenshot[],
  shortDescription: string,
}

export const getAppData = async (appid: number): Promise<AppData> => {
  const response = await fetch (`https://store.steampowered.com/api/appdetails?appids=${appid}`)
  const appDataJson = await response.json();
  const appData = appDataJson[`${appid}`]?.data

  if (!appDataJson[`${appid}`].success) {
    throw new UnsuccessfulRequestError(`Unable to retrieve game data`);
  }

  if (appData?.type != `game`) {
    throw new NotGameTypeError(`Not type game`);
  }

  if (appData?.release_date.coming_soon) {
    throw new NotReleasedError(`Game is not released yet`);
  }

  return {
    name: appData?.name,
    type: appData?.type,
    releaseDate: {
      comingSoon: appData?.release_date.coming_soon,
      date: appData?.release_date.date,
    },
    priceOverview: {
      isFree: appData?.is_free,
      currency: appData?.price_overview?.currency,
      discount: appData?.price_overview?.discount_percent,
      initial: appData?.price_overview?.initial,
      final: appData?.price_overview?.final,
    },
    screenshots: appData?.screenshots.map((screenshot: { id: number, path_thumbnail: string, path_full: string }) => ({
      id: screenshot.id,
      pathThumbnail: screenshot.path_thumbnail,
      pathFull: screenshot.path_full,
    })),
    shortDescription: appData?.short_description,
  }
}