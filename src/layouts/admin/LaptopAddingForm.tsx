import React, { FormEvent, useState } from "react";
import RequireAdmin from "./RequireAdmin";

const LaptopAddingForm: React.FC = (props) => {
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
    })

    const handelSubmit = (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/laptop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(laptop)
        }).then((response) => {
            if (response.ok) {
                alert("Đã thêm sách thành công!");
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
                    describer: ''
                })
            } else {
                alert("Gặp lỗi trong quá trình thêm laptop!");
            }
        })
    }
    return (
        <div className="container row d-flex align-items-center justify-content-center">
            <div className="col-6">
                <div className="mt-4">
                    <h1> THÊM LAPTOP</h1>
                </div>

                <form onSubmit={handelSubmit} className="form">
                    <input type="hidden" id="laptopID" value={laptop.laptopID}>
                    </input>
                    <div className="mb-4 text-start">

                        <label htmlFor="laptopName" className="form-label mt-4">Tên Laptop</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.laptopName}
                            onChange={(e) => setLaptop({ ...laptop, laptopName: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Số lượng</label>
                        <input
                            className="form-control"
                            type='number'
                            value={laptop.laptopQuantities}
                            onChange={(e) => setLaptop({ ...laptop, laptopQuantities: parseInt(e.target.value) })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Giá nhập</label>
                        <input
                            className="form-control"
                            type='number'
                            value={laptop.importPrice}
                            onChange={(e) => setLaptop({ ...laptop, importPrice: parseFloat(e.target.value) })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Giá bán chưa giảm giá</label>
                        <input
                            className="form-control"
                            type='number'
                            value={laptop.listedPrice}
                            onChange={(e) => setLaptop({ ...laptop, listedPrice: parseFloat(e.target.value) })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Giá bán sản phẩm</label>
                        <input
                            className="form-control"
                            type='number'
                            value={laptop.sellingPrice}
                            onChange={(e) => setLaptop({ ...laptop, sellingPrice: parseFloat(e.target.value) })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Bộ nhớ RAM</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.randomMemory}
                            onChange={(e) => setLaptop({ ...laptop, randomMemory: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Khả năng nâng cấp RAM</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.upgradeAbilityRAM}
                            onChange={(e) => setLaptop({ ...laptop, upgradeAbilityRAM: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Trọng lượng</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.weigh}
                            onChange={(e) => setLaptop({ ...laptop, weigh: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Màu sắc</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.colour}
                            onChange={(e) => setLaptop({ ...laptop, colour: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Kích thước</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.dimension}
                            onChange={(e) => setLaptop({ ...laptop, dimension: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Bluetooth</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.bluetooth}
                            onChange={(e) => setLaptop({ ...laptop, bluetooth: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Cổng kết nối</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.port}
                            onChange={(e) => setLaptop({ ...laptop, port: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Dung lượng pin</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.pin}
                            onChange={(e) => setLaptop({ ...laptop, pin: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Khả năng nâng cấp ổ cứng</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.upgradeAbilityDiskDrive}
                            onChange={(e) => setLaptop({ ...laptop, upgradeAbilityDiskDrive: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Webcam</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.webcam}
                            onChange={(e) => setLaptop({ ...laptop, webcam: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Hệ điều hành</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.operatingSystem}
                            onChange={(e) => setLaptop({ ...laptop, operatingSystem: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Kích thước màn hình</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.displaySize}
                            onChange={(e) => setLaptop({ ...laptop, displaySize: e.target.value })}
                            required />

                        <label htmlFor="laptopQuantities" className="form-label mt-4">Mô tả sản phẩm</label>
                        <input
                            className="form-control"
                            type="text"
                            value={laptop.describer}
                            onChange={(e) => setLaptop({ ...laptop, describer: e.target.value })}
                            required />
                    </div>
                    <button type="submit" className=" btn btn-success mt-4"> <h5>Lưu laptop</h5></button>

                </form>

            </div>

        </div>
    )
}

const LaptopAddingForm_Admin = RequireAdmin(LaptopAddingForm);
export default LaptopAddingForm_Admin;