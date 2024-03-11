export function formatNumber(x: number){
    if(x===undefined){
        return 0;
    }

    if(isNaN(x)){
        return 0;
    }
    return x.toLocaleString("vi-VN");
}