import { InputHTMLAttributes, useEffect, useState } from "react";
import Provinces from "../../models/Provinces";
import Wards from "../../models/Wards";
import Districts from "../../models/Districts";
import { takeAllProvinces } from "../../api/ProvincesAPI";
import { takeAllDistrictOfOneProvince } from "../../api/DistrictsAPI";
import { takeAllWardOfOneDistrict } from "../../api/WardAPI";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import RequireUser from "./RequireUser";
import { takeUserFromUserName } from "../../api/UserAPI";
import UserModel from "../../models/UserModel";

interface JwtPayload {
    sub: string;
}

function UpdateAccount() {

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [gender, setGender] = useState(0);
    const [email, setEmail] = useState("");
    const [birthDay, setBirthDay] = useState<Date>(new Date);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState<string>("");
    const [provinceUser, setProvinceUser] = useState<string>('')
    const [districtUser, setDistrictUser] = useState<string>('')
    const [wardUser, setWardUser] = useState<string>('')
    const [avatar, setAvatar] = useState<File | null>(null);
    const [inform, setInform] = useState("");
    const [listProvinces, setListProvinces] = useState<Provinces[]>([]);
    const [provinceID, setProvinceID] = useState<string>('');
    const [listWards, setListWards] = useState<Wards[]>([]);
    const [listDistricts, setListDistricts] = useState<Districts[]>([]);
    const [informError, setInformError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        let username = "";
        if (token) {
            const decodedToken = jwtDecode(token) as JwtPayload;
            username = decodedToken.sub + '';
        }

        if (username != null) {
            takeUserFromUserName(username).then(
                userData => {
                    if (userData == null) {
                        console.log("Không lấy được userData")
                    } else {
                        setFirstName(userData.getFirstName());
                        setLastName(userData.getLastName());
                        setGender(userData.getGender());
                        setEmail(userData.getEmail());
                        setPhoneNumber(userData.getPhoneNumber());
                    }
                }
            ).catch(
                error => {
                    setInformError(error.message);
                }
            )
        }
    }, []);

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

    const handelSubmitUpdateUser = async (e: React.FormEvent) => {
        // prevent click continously
        e.preventDefault();
        //Checking add condition
        const base64Avatar = avatar ? await getBase64(avatar) : null;
        console.log("avatar: " + base64Avatar);
        const token = localStorage.getItem('token');
        try {
            const url = 'http://localhost:8080/api/account/update';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    lastName: lastName,
                    firstName: firstName,
                    gender: gender,
                    email: email,
                    phoneNumber: phoneNumber,
                    birthDay: birthDay,
                    address: address,
                    avatar: base64Avatar
                })
            });
            if (response.ok) {
                setInform("Cập nhật thông tin tài khoản thành công")
            } else {
                setInform("Gặp lỗi trong quá trình cập nhật thông tin tài khoản!")
            }
        } catch (error) {
            setInform("Gặp lỗi trong quá trình cập nhật thông tin tài khoản!")
        }

    }


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
            if (district.getCode() === e.target.value) {
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
        <div className="register_background_colour">
            <div className="container">
                <div className="register_user">
                    <h3 className="">THÔNG TIN TÀI KHOẢN</h3>
                    <div className="register_user_border">
                        <div className="register_user_container">
                            <form onSubmit={handelSubmitUpdateUser} className="register_user_form">
                                <div className="register_user_form_infor">
                                    <div className="register_user_form_infor_border">
                                        <div className="register_user_form_item_1">
                                            <label htmlFor="lastname" className="">Họ và tên đệm: </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                className=""
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
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
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email..."
                                            />
                                            <div className="register_error" >

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
                                            }} value={gender}>
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
                                            <h5> Lưu thay đổi</h5>
                                        </button>
                                        <div className="register_error">{inform}</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const UpdateAccount_User = RequireUser(UpdateAccount);
export default UpdateAccount_User;