export class NotGameTypeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = `NotGameTypeError`;
    }
}

export class UnsuccessfulRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = `UnsuccessfulRequestError`;
    }
}

export class NotReleasedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = `NotReleasedError`;
    }
}

export class InsufficientReviewsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = `InsufficientReviewsError`;
    }
}

export class InsufficientRatingError extends Error {
    constructor(message: string) {
        super(message);
        this.name = `InsufficientRatingError`;
    }
}