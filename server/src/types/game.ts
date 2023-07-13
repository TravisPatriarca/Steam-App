export interface App {
    appid: number
    name: string
    type: string
    priceOverview: {
        isFree: boolean
        currency: string
        initial: number
        final: number
        discount: number
    }
    reviews: {
        reviewScore: number
        reviewScoreDescription: string
        totalPositive: number
        totalNegative: number
        total: number
    }
    releaseDate: {
        comingSoon: boolean
        date: string
    }
}