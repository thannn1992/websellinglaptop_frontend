import React from "react";
//async khai báo một hàm bất đồng bộ
// tự động biến đổi hàm thông thường thành một Promise
async function request(endpoint: string) {

    //Truy vấn đến đường dẫn
    // fetch có nghĩa là tìm nạp, tìm tài nguyên chỉ định trên server theo đường link đã cho
    // await LÀ ĐỢI CHO TỚI KHI fetch thực hiện xong thì các promice khác mời tiếp tục thực hiện
    const response = await fetch(endpoint);

    // Nếu bị lỗi trả vế
    if (!response.ok) {
        throw new Error(`Không thể truy cập ${endpoint}`)
    }
    // Trả về chuỗi Json từ server backend
    return response.json();

}
export default request;