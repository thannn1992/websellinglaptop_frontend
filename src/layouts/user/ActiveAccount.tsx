import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ActivateAccount() {
    const { email } = useParams();
    const { activecode } = useParams();
    const [actived, setActived] = useState(false);
    const [inform, setInform] = useState("");

    useEffect(() => {
        if (email && activecode) {
            perFormActiveAccount();
        }
    }, []);

    const perFormActiveAccount = async () => {
        try {
            const url: string = `http://localhost:8080/api/account/active?email=${email}&activecode=${activecode}`;
            const response = await fetch(url, { method: "GET" });

            if(response.ok){
                setActived(true);

            }else{
                setInform(response.text+ "");
            }

        }catch (error) {
            console.log("Lỗi khi kích hoạt tài khoản");
        }
    }

    return(
        <div>
            <h1>Kích hoạt tài khoản thành công</h1>
            {actived?<p>Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để tiếp tục sử dụng dịch vụ!</p>: (<p>{inform}</p>)}
        </div>
    )

}