import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import RequireAdmin from "./RequireAdmin";
import PictureModel from "../../models/PictureModel";
import BrandModel from "../../models/BrandModel";
import { takeAllBrand, takeBrandFromID } from "../../api/BrandAPI";
import ModelModel from "../../models/ModelModel";
import { takeAllModelofABrand, takeModelFromID } from "../../api/ModelAPI";
import ProcessorModel from "../../models/ProcessorModel";
import { takeAllProcessor, takeOneProcessorByID } from "../../api/ProcessorAPI";
import ScreenResolutionModel from "../../models/ScreenResolutionModel";
import { takeAllScreenResolution, takeOneScreenByID } from "../../api/ScreenResolutionAPI";
import HardDriverModel from "../../models/HardDriverModel";
import { takeAllHardDriver, takeOneHardDriverFromID } from "../../api/HardDriversAPI";
import { takeAllGraphicsCard, takeOneGraphicsCardFromID } from "../../api/GraphicsCardAPI";
import GraphicsCardModel from "../../models/GraphicsCardModel";

const LaptopAddingForm: React.FC = (props) => {
    const [listPicture, setListPicture] = useState<PictureModel[]>([]);
    const [listBrand, setListBrand] = useState<BrandModel[]>([]);
    const [brand, setBrand] = useState<BrandModel | null>(null);
    const [listModel, setListModel] = useState<ModelModel[]>([]);
    const [model, setModel] = useState<ModelModel | null>(null);
    const [listProcessor, setListProcessor] = useState<ProcessorModel[]>([]);
    const [processor, setProcessor] = useState<ProcessorModel | null>(null);
    const [listScreenResolution, setListScreenResolution] = useState<ScreenResolutionModel[]>([]);
    const [screenResolution, setScreenResolution] = useState<ScreenResolutionModel | null>(null);
    const [listHardDriver, setListHardDriver] = useState<HardDriverModel[]>([]);
    const [hardDriver, setHardDriver] = useState<HardDriverModel | null>(null);
    const [listGraphicsCard, setListGraphicsCard] = useState<GraphicsCardModel[]>([]);
    const [graphicsCard, setGraphicsCard] = useState<GraphicsCardModel | null>(null);

    const [InformError, setInformError] = useState(null);

    const [laptop, setLaptop] = useState({
        laptopID: 0,
        laptopName: '',
        laptopQuantities: 0,
        describer: '',
        importPrice: 0,
        listedPrice: 0,
        sellingPrice: 0,
        randomMemory: '',
        upgradeAbilityRAM: '',
        weigh: '',
        colour: '',
        dimension: '',
        bluetooth: '',
        port: '',
        pin: '',
        upgradeAbilityDiskDrive: '',
        webcam: '',
        operatingSystem: '',
        displaySize: '',
        coating: '',
        audioTechnology: '',
        sdMicroSdCardSlot: '',
        wifi: '',
        lteWwanConnection: '',

    })

    useEffect(() => {
        takeAllBrand().then(
            listBrandData => setListBrand(listBrandData)
        ).catch(
            error => setInformError(error)
        )

        takeAllProcessor().then(
            listProcessorData => setListProcessor(listProcessorData)
        ).catch(
            error => setInformError(error)
        )

        takeAllScreenResolution().then(
            listScreenResolutionData => setListScreenResolution(listScreenResolutionData)
        ).catch(
            error => setInformError(error)
        )

        takeAllHardDriver().then(
            listHardDriverData => setListHardDriver(listHardDriverData)
        ).catch(
            error => setInformError(error)
        )

        takeAllGraphicsCard().then(
            listGraphicsCardData => setListGraphicsCard(listGraphicsCardData)
        ).catch(
            error => setInformError(error)
        )

    }, [])

    const handleBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {

        takeBrandFromID(parseInt(e.target.value)).then(
            brandData => setBrand(brandData)

        ).catch(
            error => setInformError(error)
        )
        handleGetListModel(parseInt(e.target.value))
    }

    const handleSetModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
        takeModelFromID(parseInt(e.target.value)).then(
            modelData => setModel(modelData)
        ).catch(
            error => setInformError(error)
        )
    }

    const handleGetListModel = (brandID: number) => {
        takeAllModelofABrand(brandID).then(
            listModelData => setListModel(listModelData)
        ).catch(
            error => setInformError(error)
        )
    }

    const hanedleSetProcessor = (e: React.ChangeEvent<HTMLSelectElement>) => {
        takeOneProcessorByID(parseInt(e.target.value)).then(
            processorData => setProcessor(processorData)
        ).catch(
            error => setInformError(error)
        )
    }

    const handleSetScreenResolution = (e: React.ChangeEvent<HTMLSelectElement>) => {
        takeOneScreenByID(parseInt(e.target.value)).then(
            screenResolutionData => setScreenResolution(screenResolutionData)
        ).catch(
            error => setInformError(error)
        )
    }

    const handleSetHardDriver = (e: React.ChangeEvent<HTMLSelectElement>) => {
        takeOneHardDriverFromID(parseInt(e.target.value)).then(
            hardDriverData => setHardDriver(hardDriverData)
        ).catch(
            error => setInformError(error)
        )
    }
    const handleSetGraphicsCard = (e: React.ChangeEvent<HTMLSelectElement>) => {
        takeOneGraphicsCardFromID(parseInt(e.target.value)).then(
            graphicsCardData => setGraphicsCard(graphicsCardData)
        ).catch(
            error => setInformError(error)
        )
    }

    const handelSubmit = (event: FormEvent) => {

        event.preventDefault();

        let listHardDriver: HardDriverModel[] = [];
        if (hardDriver != null) {
            listHardDriver.push(hardDriver);
        }

        let ListGraphicCard: GraphicsCardModel[] = [];
        if (graphicsCard != null) {
            ListGraphicCard.push(graphicsCard);
        }

        const laptopUpdate = { ...laptop, brand: brand, model: model, processor: processor, screenResolution: screenResolution, listGraphicsCard: ListGraphicCard, listHardDriver: listHardDriver, listPictures: listPicture };

        //Thêm thuộc tính listPicture vào laptop
        // const picturesWithLaptop = listPicture.map(picture => ({
        //     ...picture, laptop: laptopUpdate
        // }));

        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/api/produce/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(laptopUpdate)
        }).then((response) => {
            if (response.ok) {

                alert("Đã thêm sản phẩm thành công!");
                setLaptop({
                    laptopID: 0,
                    laptopName: '',
                    laptopQuantities: 0,
                    importPrice: 0,
                    listedPrice: 0,
                    sellingPrice: 0,
                    randomMemory: '',
                    upgradeAbilityRAM: '',
                    weigh: '',
                    colour: '',
                    dimension: '',
                    bluetooth: '',
                    port: '',
                    pin: '',
                    upgradeAbilityDiskDrive: '',
                    webcam: '',
                    operatingSystem: '',
                    displaySize: '',
                    describer: '',
                    coating: '',
                    audioTechnology: '',
                    sdMicroSdCardSlot: '',
                    wifi: '',
                    lteWwanConnection: '',

                })
            } else {
                alert("Gặp lỗi trong quá trình thêm laptop!");
            }
        })
    }

    // HANDLE AVATAR CHANGE
    const handelAddPictureLaptop = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            let updatedListPictures: PictureModel[] = [];
            let listFileName: string[] = [];

            for (let i: number = 0; i < e.target.files.length; i++) {
                const file = e.target.files[i];
                const fileName = e.target.files[i]?.name;
                const base64Avatar = await getBase64(file);
                console.log(fileName)
                if (base64Avatar) {
                    const pictureID: number = 0;
                    const icons: boolean = false;
                    const pictureName: string = fileName;
                    const pictureLink: string = "";
                    const pictureData: string = base64Avatar;
                    const picture: PictureModel = new PictureModel(pictureID, icons, pictureName, pictureLink, pictureData);
                    updatedListPictures.push(picture);
                }

                if (fileName) {
                    listFileName.push(fileName);
                }
            }

            if (listFileName.length > 0) {
                let listFileNamePicture: string = "";
                for (let i: number = 0; i < listFileName.length; i++) {
                    listFileNamePicture += listFileName[i] + "; ";
                }

                const element = document.getElementById('file-name');

                if (element) {
                    element.textContent = listFileNamePicture;
                }
            }
            setListPicture(updatedListPictures);
        }
    }

    //COVER FILE TO BASE64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="adding_laptop_background_colour">

            <div className="container ">

                <div className="adding_laptop">

                    <div className="adding_laptop_border">
                        <div className="register_user_container">
                            <div className="adding_laptop_header">
                                <h3> THÊM LAPTOP</h3>
                            </div>

                            <form onSubmit={handelSubmit} className="">
                                <input type="hidden" id="laptopID" value={laptop.laptopID}>
                                </input>
                                <div className="adding_laptop_form_infor_border">

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopName" className="">Tên Laptop: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.laptopName}
                                            onChange={(e) => setLaptop({ ...laptop, laptopName: e.target.value })}
                                            required />
                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Số lượng: </label>
                                        <input
                                            className=""
                                            type='number'
                                            value={(laptop.laptopQuantities) !== 0 ? (laptop.laptopQuantities) : ""}
                                            onChange={(e) => setLaptop({ ...laptop, laptopQuantities: parseInt(e.target.value) })}
                                            required />
                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Giá nhập: </label>
                                        <input
                                            className=""
                                            type='number'
                                            value={(laptop.importPrice) !== 0 ? (laptop.importPrice) : ""}
                                            onChange={(e) => setLaptop({ ...laptop, importPrice: parseFloat(e.target.value) })}
                                            required />

                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Giá bán chưa giảm giá: </label>
                                        <input
                                            className=""
                                            type='number'
                                            value={(laptop.listedPrice) !== 0 ? (laptop.listedPrice) : ""}
                                            onChange={(e) => setLaptop({ ...laptop, listedPrice: parseFloat(e.target.value) })}
                                            required />

                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Giá bán sản phẩm: </label>
                                        <input
                                            className=""
                                            type='number'
                                            value={(laptop.sellingPrice) !== 0 ? (laptop.sellingPrice) : ""}
                                            onChange={(e) => setLaptop({ ...laptop, sellingPrice: parseFloat(e.target.value) })}
                                            required />

                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="province" className="">Thương hiệu:</label>
                                        <select onChange={
                                            handleBrand
                                        } >
                                            <option value="brand"><p>Chọn thương hiệu</p> </option>
                                            {listBrand.map((brand) => (
                                                <option value={brand.getbrandID()}><span>{brand.getbrandName()}</span> </option>
                                            ))
                                            }
                                        </select>
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="province" className="">Dòng sản phẩm:</label>
                                        <select onChange={
                                            handleSetModel
                                        } >
                                            <option value="brand"><p>Chọn dòng sản phẩm</p> </option>
                                            {(listModel.length !== 0) ? listModel.map((model) => (
                                                <option value={model.getModelID()}><span>{model.getModelName()}</span> </option>
                                            )) : ""
                                            }
                                        </select>
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">CPU: </label>
                                        <select onChange={hanedleSetProcessor} >
                                            <option value=""><p>Chọn CPU</p> </option>
                                            {(listProcessor.length !== 0) ? listProcessor.map((processor) => (
                                                <option value={processor.getProcessorID()}><span>{processor.getProcessorName()}</span> </option>
                                            )) : ""
                                            }
                                        </select>
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Card đồ họa: </label>
                                        <select onChange={handleSetGraphicsCard} >
                                            <option value=""><p>Chọn card đồ họa</p> </option>
                                            {(listGraphicsCard.length !== 0) ? listGraphicsCard.map((graphicCard) => (
                                                <option value={graphicCard.getGraphicsCardID()}><span>{graphicCard.getGraphicsCardName()}</span> </option>
                                            )) : ""
                                            }
                                        </select>
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Bộ nhớ RAM: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.randomMemory}
                                            onChange={(e) => setLaptop({ ...laptop, randomMemory: e.target.value })}
                                            required />

                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Khả năng nâng cấp RAM: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.upgradeAbilityRAM}
                                            onChange={(e) => setLaptop({ ...laptop, upgradeAbilityRAM: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Ổ cứng: </label>
                                        <select onChange={handleSetHardDriver} >
                                            <option value=""><p>Chọn ổ cứng</p> </option>
                                            {(listHardDriver.length !== 0) ? listHardDriver.map((hardDriver) => (
                                                <option value={hardDriver.getHardDriverID()}><span>{hardDriver.getHardDriverName()}</span> </option>
                                            )) : ""
                                            }
                                        </select>
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Khả năng nâng cấp ổ cứng: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.upgradeAbilityDiskDrive}
                                            onChange={(e) => setLaptop({ ...laptop, upgradeAbilityDiskDrive: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Kích thước màn hình: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.displaySize}
                                            onChange={(e) => setLaptop({ ...laptop, displaySize: e.target.value })}
                                            required />
                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Độ phân giải màn hình:</label>
                                        <select onChange={handleSetScreenResolution} >
                                            <option value=""><p>Chọn độ phân giải màn hình</p> </option>
                                            {(listScreenResolution.length !== 0) ? listScreenResolution.map((screenResolution) => (
                                                <option value={screenResolution.getScreenResolutionID()}><span>{screenResolution.getScreenResolutionName()}</span> </option>
                                            )) : ""
                                            }
                                        </select>
                                    </div>
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Lớp phủ: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.coating}
                                            onChange={(e) => setLaptop({ ...laptop, coating: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Trọng lượng: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.weigh}
                                            onChange={(e) => setLaptop({ ...laptop, weigh: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Kích thước: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.dimension}
                                            onChange={(e) => setLaptop({ ...laptop, dimension: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Màu sắc: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.colour}
                                            onChange={(e) => setLaptop({ ...laptop, colour: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Dung lượng pin: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.pin}
                                            onChange={(e) => setLaptop({ ...laptop, pin: e.target.value })}
                                            required />
                                    </div>

                                    
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Webcam: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.webcam}
                                            onChange={(e) => setLaptop({ ...laptop, webcam: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Công nghệ âm thanh: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.audioTechnology}
                                            onChange={(e) => setLaptop({ ...laptop, audioTechnology: e.target.value })}
                                            required />
                                    </div>

                                    
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Cổng kết nối: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.port}
                                            onChange={(e) => setLaptop({ ...laptop, port: e.target.value })}
                                            required />
                                    </div>

                                             
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Khe thẻ SD/ Micro SD: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.sdMicroSdCardSlot}
                                            onChange={(e) => setLaptop({ ...laptop, sdMicroSdCardSlot: e.target.value })}
                                            required />
                                    </div>

                                    
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Wifi: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.wifi}
                                            onChange={(e) => setLaptop({ ...laptop, wifi: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Bluetooth: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.bluetooth}
                                            onChange={(e) => setLaptop({ ...laptop, bluetooth: e.target.value })}
                                            required />
                                    </div>
                                   
                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Kết nối LTE/WWAN: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.lteWwanConnection}
                                            onChange={(e) => setLaptop({ ...laptop, lteWwanConnection: e.target.value })}
                                            required />
                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Hệ điều hành: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.operatingSystem}
                                            onChange={(e) => setLaptop({ ...laptop, operatingSystem: e.target.value })}
                                            required />

                                    </div>

                                    <div className="adding_laptop_form_item_1">
                                        <label htmlFor="laptopQuantities" className="">Mô tả sản phẩm: </label>
                                        <input
                                            className=""
                                            type="text"
                                            value={laptop.describer}
                                            onChange={(e) => setLaptop({ ...laptop, describer: e.target.value })}
                                            required />
                                    </div>

                                    <div className="register_user_form_item_2">
                                        <label htmlFor="avatar" className="">Hình ảnh sản phẩm: </label>
                                        <input
                                            type="file"
                                            id="avatar"
                                            className=""
                                            accept="image/*"
                                            multiple
                                            onChange={handelAddPictureLaptop}
                                        />
                                        <label htmlFor="avatar" className="custom_file_upload"><span>Chọn file...</span>
                                            <p className="register_user_form_item_file_name" id="file-name"></p>
                                        </label>
                                    </div>

                                </div>
                                <div className="adding_laptop_form_infor_button">
                                    <button type="submit" className="">
                                        <h5> Thêm sản phẩm</h5>
                                    </button>
                                    <div className="register_error"></div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const LaptopAddingForm_Admin = RequireAdmin(LaptopAddingForm);
export default LaptopAddingForm_Admin;