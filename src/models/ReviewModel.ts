class ReviewModel {
    private rating: number;
    private comment: string;
    private reviewID: number;


    public getRating(): number {
        return this.rating;
    }

    public setRating(rating: number): void {
        this.rating = rating;
    }

    public getComment(): string {
        return this.comment;
    }

    public setComment(comment: string): void {
        this.comment = comment;
    }

    public getReviewID(): number {
        return this.reviewID;
    }

    public setReviewID(reviewID: number): void {
        this.reviewID = reviewID;
    }
    constructor(rating: number, comment: string, reviewID: number) {
        this.rating = rating
        this.comment = comment
        this.reviewID = reviewID
    }
}
export default ReviewModel;