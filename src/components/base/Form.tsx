import { useState } from "react";
import { Employee } from "../../models/Employee";
import { formatDate } from "../util/formatData";
import { validateEmail } from "../util/validateData";

type PropTypes = {
    onClose: () => void
}

export default function Form({onClose}: PropTypes) {
    //state chua du lieu cua doi tuong nhan vien
    const [employee, setEmployee] = useState<Employee>({
        id: 0,
        employeeName:"",
        dateOfBirth:"",
        email:"",
        address:"",
        status:true,
    })

    const [NameError, setNameError] = useState<string>("")
    const [dateOfBirthError, setDateOfBirthError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("");

    //validate du lieu input
    const validateData = (name: string, value: string) => {
        if(name === "employeeName"){
            if(!value){
                setNameError("Tên không được để trống")
            }else{
                setNameError("")
            }
        }
        if (name === "dateOfBirth") {
          if (!value) {
            setDateOfBirthError("Ngày sinh không được để trống.");
          } else {
            //kiem tra ngay sinh co lon hon ngay sinh hien tai khong
            if(formatDate(value) > formatDate(new Date().toString())){
                setDateOfBirthError("Ngày sinh không được lớn hơn ngày hiện tại.");
            }else{
            setDateOfBirthError("");
          }
        }
        }
        if (name === "email") {
          if (!value) {
            setEmailError("Email không được để trống.");
          } else {
            if (!validateEmail(value)) {
              setEmailError("Email không đúng định dạng");
            }else{
            setEmailError("");
          }
        }
        }
    }

    //lay gia tri trong o input
    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const {name, value} = e.target
        // cap nhat lai state cho doi tuong employee
        setEmployee({
            ...employee,
            [name]:value,
        })

        //goi ham vaLidate moi khi change du lieu
        validateData(name, value)
    }
  return (
    <>
      <div className="overlay">
        <form className="form">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Chỉnh sửa nhân viên</h4>
            <i onClick={onClose} className="fa-solid fa-xmark" />
          </div>
          <div>
            <label className="form-label" htmlFor="userName">
              Họ và tên
            </label>
            <input
              name="employeeName"
              type="text"
              className="form-control"
              onChange={handleChangeInput}
            />
            {NameError && <div className="form-text error">{NameError}</div>}
          </div>
          <div>
            <label className="form-label" htmlFor="dateOfBirth">
              Ngày sinh
            </label>
            <input
              name="dateOfBirth"
              type="date"
              className="form-control"
              onChange={handleChangeInput}
            />
          </div>
          {dateOfBirthError && (
            <div className="form-text error">{dateOfBirthError}</div>
          )}
          <div>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              onChange={handleChangeInput}
            />
          </div>
          {emailError && <div className="form-text error">{emailError}</div>}
          <div>
            <label className="form-label" htmlFor="address">
              Địa chỉ
            </label>
            <textarea
              onChange={handleChangeInput}
              className="form-control"
              name="address"
              rows={3}
              defaultValue={""}
            />
          </div>
          <div>
            <button className="w-100 btn btn-primary">Thêm mới</button>
          </div>
        </form>
      </div>
    </>
  );
}
