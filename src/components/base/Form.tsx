/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Employee } from "../../models/Employee";
import { formatDate } from "../util/formatData";
import { validateEmail } from "../util/validateData";
import { saveData } from "../util/saveData";

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

    //state luu tru danh sach nhan vien
    const [employeeList , setEmployeeList] = useState<Employee[]>(() => {
        //callback function
        const employeeLocal = localStorage.getItem('employees')
        return employeeLocal ? JSON.parse(employeeLocal) : []
    })

    //validate du lieu input
    const validateData = (name: string, value: string) => {
        //xac dinh kieu du lieu co hop le hay khong
        let isValid = true
        if(name === "employeeName"){
            if(!value){
                setNameError("Tên không được để trống")
                isValid = false;
            }else{
                setNameError("")
            }
        }
        if (name === "dateOfBirth") {
          if (!value) {
            setDateOfBirthError("Ngày sinh không được để trống.");
            isValid = false;
          } else {
            //kiem tra ngay sinh co lon hon ngay sinh hien tai khong
            if(formatDate(value) > formatDate(new Date().toString())){
                setDateOfBirthError("Ngày sinh không được lớn hơn ngày hiện tại.");
                isValid = false;
            }else{
            setDateOfBirthError("");
          }
        }
        }
        if (name === "email") {
          if (!value) {
            setEmailError("Email không được để trống.");
            isValid = false;
          } else {
            if (!validateEmail(value)) {
              setEmailError("Email không đúng định dạng");
              isValid = false;
            }else{
            setEmailError("");
          }
        }
        }
        return isValid
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
    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        //ngan chan load lai trang
        e.preventDefault()
        // goi ham Validate du lieu khi nhan nut submit
        const nameValid = validateData("employeeName", employee.employeeName)
        const dateValid = validateData("dateOfBirth", employee.dateOfBirth)
        const emailValid = validateData("email", employee.email);

        if( nameValid && dateValid && emailValid){
            //them moi nhan vien len local
            const updateEmployeeLocals = [...employeeList,{...employee, id:Math.ceil(Math.random() * 100000)} ]

            //luu du lieu len localstorage
            // bat buoc phai ep kieu dang JSON khi truyen du lieu len local
            // localStorage.setItem("employees",JSON.stringify(updateEmployeeLocals))

            saveData("employees", updateEmployeeLocals)

            //dong form them moi
            onClose()
        }
    }
    
  return (
    <>
      <div className="overlay">
        <form className="form" onSubmit={handleSubmitForm}>
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
            <button type="submit" className="w-100 btn btn-primary">Thêm mới</button>
          </div>
        </form>
      </div>
    </>
  );
}
