import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

export function renderRating(point: number) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {


        if (i <= point) {
            stars.push(<StarFill className="renderRating-starfill" />)

        } else if (i > point) {
            if ((i - point) >= 0.5 && (i - point) < 1) {
                stars.push(<StarHalf className="renderRating-starfill" />)
            } else {
                stars.push(<Star className="tex-secondary" />)
            }
        }

    }
    return stars;
}