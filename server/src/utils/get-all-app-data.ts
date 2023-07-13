import { App } from "../types/game";
import { getAppData } from "./get-app-data";
import { getAppReviewData } from "./get-app-review-data";

export const getAllAppData = async (appId: number): Promise<App> => {
  const appData = await getAppData(appId);
  const appReviewData = await getAppReviewData(appId);

  return {
    appid: appId,
    name: appData.name,
    priceOverview: {
      isFree: appData.priceOverview.isFree,
      currency: appData.priceOverview.currency ?? null,
      discount: appData.priceOverview.discount ?? null,
      final: appData.priceOverview.final ?? null,
      initial: appData.priceOverview.initial ?? null,
    },
    reviews: {
      reviewScore: appReviewData.reviewScore,
      reviewScoreDescription: appReviewData.reviewScoreDescription,
      total: appReviewData.total,
      totalNegative: appReviewData.totalNegative,
      totalPositive: appReviewData.totalPositive,
    },
    releaseDate: {
      comingSoon: appData.releaseDate.comingSoon,
      date: appData.releaseDate.date,
    },
    type: appData.type,
  }
}