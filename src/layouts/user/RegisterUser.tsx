import { useEffect, useState } from "react";
import Provinces from "../../models/Provinces";
import Wards from "../../models/Wards";
import Districts from "../../models/Districts";
import { takeAllProvinces } from "../../api/ProvincesAPI";
import { takeAllDistrictOfOneProvince } from "../../api/DistrictsAPI";
import { takeAllWardOfOneDistrict } from "../../api/WardAPI";

export function RegisterUser() {
    const [lastName, setLatName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [passWordRepeat, setPassWordRepeat] = useState("");
    const [gender, setGender] = useState(0);
    const [email, setEmail] = useState("");
    const [birthDay, setBirthDay] = useState<Date>();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState<string>("");
    const [provinceUser, setProvinceUser] = useState<string>('')
    const [districtUser, setDistrictUser] = useState<string>('')
    const [wardUser, setWardUser] = useState<string>('')
    const [houseNumber, setHouseNumber] = useState<string>('')

    const [avatar, setAvatar] = useState<File | null>(null);
    const [errorUserName, setErrorUserName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassWord, setErrorPassword] = useState("");
    const [errorRepeatPassWord, setErrorRepeatPassWord] = useState("");
    const [inform, setInform] = useState("");
    const [listProvinces, setListProvinces] = useState<Provinces[]>([]);
    const [provinceID, setProvinceID] = useState<string>('');
    const [listWards, setListWards] = useState<Wards[]>([]);
    const [listDistricts, setListDistricts] = useState<Districts[]>([]);
    const [informError, setInformError] = useState(null);

    useEffect(() => {


        takeAllProvinces().then(
            provincesData => setListProvinces(provincesData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        )

        takeAllDistrictOfOneProvince(provinceID).then(
            districtData => setListDistricts(districtData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        )
    }, []);
    const handleProvinceChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvinceID = e.target.value;
        listProvinces.map((province) => {
            if (province.getCode() === e.target.value) {
                setProvinceUser(province.getName())
            }
        })
        setProvinceID(selectedProvinceID);
        takeAllDistrictOfOneProvince(selectedProvinceID).then(
            districtsData => setListDistricts(districtsData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        );
    }

    const handleDistrictChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDistrictID = e.target.value;
        listDistricts.map((district) => {
            if(district.getCode() === e.target.value){
                setDistrictUser(district.getName());
            }
        })

        setProvinceID(selectedDistrictID);
        takeAllWardOfOneDistrict(selectedDistrictID).then(
            wardData => setListWards(wardData)
        ).catch(
            error => {
                setInformError(error.message);
            }
        );
    }

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
                        birthDay: birthDay,
                        address: address,
                        activate: 0,
                        codeActive: "",
                        avatar: base64Avatar
                    })
                });
                if (response.ok) {
                    setInform("Đăng ký thành công, vui lòng kiểm tra email đăng ký để kích hoạt tài khoản!")
                } else {
                    setInform("Gặp lỗi trong quá trình đăng ký tài khoản!")
                }
            } catch (error) {
                setInform("Gặp lỗi trong quá trình đăng ký tài khoản!")
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
                setErrorUserName("Tài khoản này đã tồn tại, vui lòng chọn tên đăng nhập khác!")
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lổi trong quá trình kiểm tra tài khoản", error);
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
                setErrorEmail("Email này đã tồn tại!");
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi trong quá trình kiểm tra email: ", error);
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
            setErrorPassword("Mật khẩu tối thiểu 8 ký tự, có ít nhất 1 chữ số và 1 ký tự đặc biệt");
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
            setErrorRepeatPassWord("Mật khẩu nhập lại không khớp, vui lòng kiểm tra lại!");
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
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileName = e.target.files[0]?.name;
            setAvatar(file);
            if (fileName) {
                const element = document.getElementById('file-name');
                if (element) {
                    element.textContent = fileName;
                }
            }
        }
    }
    //HANDLE GENDER CHANGE
    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(parseInt(e.target.value));
    }
    //HANDEL ADDRESS CHANGE
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let houseNumber = e.target.value;
        setAddress(houseNumber + ', ' + wardUser + ', ' + districtUser + ', ' + provinceUser);
    }


    return (
        <div className="container">
            <div className="register_user">
                <h3 className="text-center">ĐĂNG KÝ TÀI KHOẢN MK </h3>
                <div className="register_user_border">
                    <div className="register_user_container">
                        <form onSubmit={handelSubmitRegiser} className="register_user_form">
                            <div className="register_user_form_user" >
                                <h5>Thông tin đăng nhập</h5>
                                <div className="register_user_form_user_border">
                                    <div className="register_user_form_item">
                                        <label htmlFor="userName" className="">Tên đăng nhập:</label>
                                        <input
                                            type="text"
                                            id="userName"
                                            className=""
                                            value={userName}
                                            onChange={handleInputUserNameChanged}
                                            placeholder="Tên đăng nhập..."
                                        />
                                        <div className="register_error">{errorUserName}</div>
                                    </div>
                                    <div className="register_user_form_item">
                                        <label htmlFor="password" className="">Mật khẩu:</label>
                                        <input
                                            type="password"
                                            id="passWord"
                                            className=""
                                            value={passWord}
                                            onChange={handelInputPasswordChanged}
                                            placeholder="Mật khẩu..."
                                        />
                                        <div className="register_error">{errorPassWord}</div>
                                    </div>
                                    <div className="register_user_form_item">
                                        <label htmlFor="passwordRepeat" className="">Nhập lại mật khẩu</label>
                                        <input
                                            type="password"
                                            id="repeatPassWord"
                                            className=""
                                            value={passWordRepeat}
                                            onChange={handelInputCheckingPasswordRepeatChanged}
                                            placeholder="Nhập lại mật khẩu"
                                        />
                                        <div className="register_error" >
                                            {errorRepeatPassWord}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="register_user_form_infor">
                                <h5>Thông tin khách hàng</h5>
                                <div className="register_user_form_infor_border">

                                    <div className="register_user_form_item_1">
                                        <label htmlFor="lastname" className="">Họ và tên đệm: </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className=""
                                            value={lastName}
                                            onChange={(e) => setLatName(e.target.value)}
                                            placeholder="Họ và tên đệm"
                                        />
                                    </div>

                                    <div className="register_user_form_item_1">
                                        <label htmlFor="firstName" className="">Tên: </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className=""
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Tên..."
                                        />
                                    </div>
                                    <div className="register_user_form_item_1">
                                        <label htmlFor="email" className="">Email: </label>
                                        <input
                                            type="text"
                                            id="email"
                                            className=""
                                            value={email}
                                            onChange={handelInputEmailchanged}
                                            placeholder="Email..."
                                        />
                                        <div className="register_error" >
                                            {errorEmail}
                                        </div>
                                    </div>
                                    <div className="register_user_form_item_1">
                                        <label htmlFor="phoneNumber" className="">Số điện thoại: </label>
                                        <input
                                            type="text"
                                            id="phoneNumber"
                                            className=""
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Số điện thoại..."
                                        />
                                    </div>
                                    <div className="register_user_form_item_1">
                                        <label htmlFor="gender" className="">Giới tính: </label>
                                        <select onChange={(e) => {
                                            handleGenderChange(e);
                                        }} >
                                            <option value="0" ><span>Nam</span> </option>
                                            <option value="1" ><span>Nữ</span> </option>
                                            <option value="2"><span>Khác</span> </option>
                                        </select>

                                    </div>

                                    <div className="register_user_form_item_1">
                                        <label htmlFor="birthDay" className="">Ngày sinh:</label>
                                        <input
                                            type="date"
                                            id="birthDay"
                                            className=""
                                            //                                             The .toISOString() method converts a Date object to a string in the ISO format, which includes the date and time information separated by the letter 'T'. For example, the ISO string for a date like "2022-09-15" would be "2022-09-15T00:00:00.000Z".

                                            // In the code snippet provided earlier, .split('T')[0] is used to extract only the date part from the ISO string. Let me break it down for better understanding:

                                            // birthDay.toISOString(): Converts the Date object birthDay to an ISO string format.
                                            // .split('T'): Splits the ISO string using the letter 'T' as the separator. This will create an array with two elements - the date part before 'T' and the time part after 'T'.
                                            // [0]: Accesses the first element of the array, which corresponds to the date part before 'T'.
                                            // So, when we use birthDay.toISOString().split('T')[0], we are converting the Date object to an ISO string and then extracting only the date part without the time information.

                                            // If birthDay is undefined, we use '' (empty string) as the value for the input field, ensuring that the input remains empty when birthDay is not set.
                                            //                                             
                                            value={birthDay ? birthDay.toISOString().split('T')[0] : ''}
                                            onChange={(e) => setBirthDay(new Date(e.target.value))}
                                            placeholder="Ngày sinh..."
                                        />
                                    </div>
                                    <div className="register_user_form_item_2">
                                        <label htmlFor="avatar" className="">Hình đại diện: </label>
                                        <input
                                            type="file"
                                            id="avatar"
                                            className=""
                                            accept="image/*"
                                            onChange={handelAvatarChange}
                                        />
                                        <label htmlFor="avatar" className="custom_file_upload"><span>Chọn file...</span>
                                            <p className="register_user_form_item_file_name" id="file-name"></p>
                                        </label>

                                    </div>
                                    <div className="register_user_form_item_1">
                                        <label htmlFor="province" className="">Tỉnh/ Thành phố: </label>
                                        <select onChange={(e) => {
                                            handleProvinceChanged(e);
                                        }} >
                                            <option value="province"><p>Chọn Tỉnh, Thành phố</p> </option>
                                            {listProvinces.map((province) => (
                                                <option value={province.getCode()}><span>{province.getName()}</span> </option>
                                            ))
                                            }
                                        </select>
                                    </div>

                                    <div className="register_user_form_item_1">
                                        <label htmlFor="district" className="">Quận/ Huyện: </label>
                                        <select onChange={(e) => {
                                            handleDistrictChanged(e);
                                        }}>
                                            <option value="district"><p>Chọn Quận, Huyện</p> </option>
                                            {listDistricts.map((districts) => (
                                                <option value={districts.getCode()} ><span>{districts.getName()}</span> </option>
                                            ))
                                            }
                                        </select>
                                    </div>

                                    <div className="register_user_form_item_2">
                                        <label htmlFor="district" className="">Phường/ Xã: </label>
                                        <select onChange={(e) => {
                                            setWardUser(e.target.value);
                                        }}>
                                            <option value="ward"> Chọn Phường, Xã</option>
                                            {listWards.map((ward) => (
                                                <option value={ward.getName()} ><span>{ward.getName()}</span> </option>
                                            ))
                                            }
                                        </select>
                                    </div>
                                    <div className="register_user_form_item_2">
                                        <label htmlFor="district" className="">Số nhà, tên đường: </label>
                                        <input type="text" onChange={(e) => {
                                            handleAddressChange(e);
                                        }} placeholder="Số nhà, tên đường" />
                                    </div>
                                </div>

                                <div className="register_user_form_infor_button">
                                    <button type="submit" className="">
                                        <h5> Đăng ký bằng Email</h5>
                                    </button>
                                    <div className="register_error">{inform}</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}