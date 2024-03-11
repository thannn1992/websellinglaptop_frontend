import { useState } from "react";

export function RegisterUser() {
    const [lastName, setLatName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [passWordRepeat, setPassWordRepeat] = useState("");
    const [gender, setGender] = useState(1);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);


    const [errorUserName, setErrorUserName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassWord, setErrorPassword] = useState("");
    const [errorRepeatPassWord, setErrorRepeatPassWord] = useState("");
    const [inform, setInform] = useState("");

    //COVER FILE TO BASE64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);


        });
    };

    const handelSubmitRegiser = async (e: React.FormEvent) => {
        //Clear any previous error message
        setErrorEmail('');
        setErrorPassword("");
        setErrorRepeatPassWord("");
        setErrorUserName("");

        // prevent click continously
        e.preventDefault();

        // Checking condition and assign result into variable
        const isUserNameValid = !await checkingUserName(userName);
        const isEmailValid = !await checkingEmail(email);
        const isPassWordValid = !await checkingPassword(passWord);
        const isRepeatPassWordValid = !await checkingPasswordRepeat(passWordRepeat);

        //Checking add condition
        if (isEmailValid && isPassWordValid && isRepeatPassWordValid && userName) {
            const base64Avatar = avatar ? await getBase64(avatar) : null;
            console.log("avatar: " + base64Avatar);


            try {
                const url = 'http://localhost:8080/api/account/register';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        lastName: lastName,
                        firstName: firstName,
                        userName: userName,
                        password: passWord,
                        gender: gender,
                        email: email,
                        phoneNumber: phoneNumber,
                        deliveryAddress: address,
                        activate: 0,
                        codeActive: "",
                        avatar: base64Avatar
                    })
                });
                if(response.ok){
                    setInform("Regignter successfull, plese checking email to active your account!")
                }else{
                    setInform("Having error in register your account!")
                }

            } catch (error){
                setInform("Having error in register your account!")
            }
    }

    }


    // CHECKING USERNAME
    const checkingUserName = async (userName: string) => {
        // endpoint
        const url = `http://localhost:8080/user/search/existsByUserName?userName=${userName}`;
        // call api
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === "true") {
                setErrorUserName("This username has already existed!")
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error in checking username: ", error);
            return false;
        }
    }

    const handleInputUserNameChanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        setErrorUserName("");
        return checkingUserName(e.target.value);
    }
    // ENDING CHECING USERNAME

    // ENDING CHECKING EMAIL
    const checkingEmail = async (email: string) => {
        //endpoint
        const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
        // call api
        try {
            const response = await fetch(url);
            const responseData = await response.text();
            if (responseData === "true") {
                setErrorEmail("Email has already existed!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error in checking email: ", error);
            return false;
        }
    }

    const handelInputEmailchanged = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // change value
        setEmail(e.target.value);
        // checking
        setErrorEmail("");
        return checkingEmail(e.target.value);
    }
    // ENDING CHECKING PASSWORD

    // CHECKING PASSWORD
    const checkingPassword = (passWord: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(passWord)) {
            setErrorPassword("Password has at least 8 characters, at least one number and at least one special character");
            return true;
        } else {
            setErrorPassword("");
            return false;
        }
    }

    const handelInputPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassWord(e.target.value);
        setErrorPassword("");
        return checkingPassword(passWord);
    }
    // ENDING CHECKING PASSWORD

    // CHECKING REPEATPASSWORD
    const checkingPasswordRepeat = (repeatPassWord: string) => {
        if (!(passWord === repeatPassWord)) {
            setErrorRepeatPassWord("Repeat password is not match, please checking again!");
            return true;
        } else {
            setErrorRepeatPassWord("");
            return false;
        }
    }
    const handelInputCheckingPasswordRepeatChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassWordRepeat(e.target.value);
        setErrorPassword("");
        return checkingPasswordRepeat(e.target.value);
    }
    //ENDING CHECKING PASSWORD

    // HANDLE AVATAR CHANGE
    const handelAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setAvatar(file);
        }
    }

    //HANDLE GENDER CHANGE
    const handelGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(parseInt(e.target.value));
    }

    return (
        <div className="container">
            <h1 className="mt-3 mb-3 text-center">ĐĂNG KÝ TÀI KHOẢN </h1>
            <div className="mb-b col-md-6 col-12 mx-auto">

                <form onSubmit={handelSubmitRegiser} className="form">

                    <div className="mb-6 text-start">
                        <label htmlFor="userName" className="form-label mb-2">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="userName"
                            className="form-control mb-4"
                            value={userName}
                            onChange={handleInputUserNameChanged}
                        />
                    </div>
                    <div style={{ color: "red" }}>{errorUserName}</div>

                    <div className="mb-3 text-start">
                        <label htmlFor="password" className="form-label mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            id="passWord"
                            className="form-control mb-4"
                            value={passWord}
                            onChange={handelInputPasswordChanged}
                        />
                    </div>
                    <div style={{ color: "red" }}>{errorPassWord}</div>

                    <div className="mb-3 text-start">
                        <label htmlFor="passwordRepeat" className="form-label mb-2">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            id="repeatPassWord"
                            className="form-control mb-4"
                            value={passWordRepeat}
                            onChange={handelInputCheckingPasswordRepeatChanged}
                        />
                    </div>
                    <div style={{ color: "red" }}>{errorRepeatPassWord}</div>

                    <div className="mb-3 text-start">
                        <label htmlFor="email" className="form-label mb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control mb-4"
                            value={email}
                            onChange={handelInputEmailchanged}
                        />
                    </div>
                    <div style={{ color: "red" }}>{errorEmail}</div>

                    <div className="mb-3 text-start">
                        <label htmlFor="firstName" className="form-label mb-2">Tên</label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-control mb-4"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="lastname" className="form-label mb-2">Họ và tên đệm</label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control mb-4"
                            value={lastName}
                            onChange={(e) => setLatName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="phoneNumber" className="form-label mb-2">Số điện thoại</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            className="form-control mb-4"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="avatar" className="form-label mb-2">Hình đại diện</label>
                        <input
                            type="file"
                            id="avatar"
                            className="form-control mb-4"
                            accept="image/*"
                            onChange={handelAvatarChange}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label htmlFor="gender" className="form-lable mb-2">Giới tính</label>
                        <div className="form-check">
                            <input
                                type="radio"
                                id="gender"
                                className="form-check-input mb-4"
                                name="1"


                                checked={(gender === 1) ? true : false}

                                onChange={handelGenderChange}
                            />
                            <label className="form-check-lable">Nam</label>

                        </div>

                        <div className="form-check ">
                            <input
                                type="radio"
                                id="gender"
                                className="form-check-input mb-4"
                                name="0"

                                checked={(gender === 0) ? true : false}
                                onChange={handelGenderChange}

                            />
                            <label className="form-check-lable">Nữ</label>

                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary">
                            <h5> Đăng ký bằng Email</h5>
                        </button>
                            <div style={{ color: "red" }}>{inform}</div>

                    </div>

                </form>

            </div>


        </div>
    );

}