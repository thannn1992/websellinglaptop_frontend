import { Star, StarFill } from "react-bootstrap-icons";

export function renderRating (point: number){
const stars = [];
for(let i = 1; i<=5; i++){
    if(i<=point){
        stars.push(<StarFill className="tex-warning"/>)
    }else{
        stars.push(<Star className="tex-secondary"/>)
    }

}
return stars;
}