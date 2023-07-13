import { InsufficientRatingError, InsufficientReviewsError } from "../errors/error";

interface appReviewData {
  reviewScore: number
  reviewScoreDescription: string
  totalPositive: number
  totalNegative: number
  total: number
}

export const getAppReviewData = async (appid: number): Promise<appReviewData> => {
  const response = await fetch (`https://store.steampowered.com/appreviews/${appid}?json=1`)
  const reviewData = await response.json();

  if (reviewData.query_summary?.total_reviews < 100) {
    throw new InsufficientReviewsError(`Not enough reviews`);
  }

  if (reviewData?.query_summary.total_positive/reviewData.query_summary?.total_reviews  < 0.8) {
    throw new InsufficientRatingError(`Poor rating`);
  }

  return {
    reviewScore: reviewData.query_summary?.review_score,
    reviewScoreDescription: reviewData.query_summary?.review_score_desc,
    total: reviewData.query_summary?.total_reviews,
    totalNegative: reviewData?.query_summary.total_negative,
    totalPositive: reviewData?.query_summary.total_positive,
  };
}