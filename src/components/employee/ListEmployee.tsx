/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import EmployeeItem from './EmployeeItem';
import Button from '../base/Button';
import Form from '../base/Form';
import Input from '../base/Input';
import { Employee } from '../../models/Employee';
import Modal from '../base/Modal';
import { saveData } from '../util/saveData';

const ListEmployee = () => {
    const [showForm, setShowForm] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(0)
    const [employeeNameDel, setEmployeeNameDel] = useState<string>("")
    const [showModalToggle, setShowModalToggle] = useState<boolean>(false)
    const [idToggle, setIdToggle] = useState<number>(0);
    const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);

    const [employeeList , setEmployeeList] = useState<Employee[]>(() => {
        //callback function
        const employeeLocal = localStorage.getItem('employees')
        return employeeLocal ? JSON.parse(employeeLocal) : []
    })

    //hien thi form
    const handleShowForm = (): void => {
        setShowForm(true)
    }
     const handleShowModal = (id: number ): void => {
       setIdDelete(id);
       setShowModal(true);

       // tim kiem thong tin cua nhan vien can xoa
       const findEmployee = employeeList.find((employee: Employee) => {
         return employee.id === id;
       });
       // cap nhan ten cua nhan vien can xoa
       if(findEmployee){
           setEmployeeNameDel(findEmployee?.employeeName);
       }
     };
    //dong form
    const handleCloseForm = (): void => {
      setShowForm(false);
    };
    const handleSearch = () => {
        console.log("search")
    }
    const handleCloseModal = () => {
        setShowModal(false)
    }

    //hamm xoa thong tin mot nhan vien khoi localstorage
    const handleDeleteEmployee = () => {
        // B1: loc ra nhung nhan vien co id khac voi id can xoa
        const filterEmployees = employeeList.filter((employee: Employee) => {
            return employee.id !== idDelete
        })
        console.log(filterEmployees)
        // b2:luu mang vvua loc vao localStorage
        saveData("employees", filterEmployees)
        //b3: dong modal
        setShowModal(false)
        //b4: render lai danh sach nhan vien
        setEmployeeList(filterEmployees)
    }

    //ham mo modal xac nhan chan
    const handleShowModalToggle = (id:number) => {
        //cap nhat trang thai de mo modal
        setShowModalToggle(true)
        //cap nhat State de lay id can cap nhat
        setIdToggle(id)
        // lay ra thong tin nhan vien can chan
       const findEmployee = employeeList.find((employee: Employee) => employee.id === id);
       // cap nhan ten cua nhan vien can chan
       if(findEmployee){
           setEmployeeInfo(findEmployee);
       }
    }

    //ham dong modal xac nhan chan
    const handleCloseModalToggle = () => {
      //cap nhat trang thai de dong modal
      setShowModalToggle(false);
    };
    //ham xu li chuc nang chan/bo chan nhan vien
    const handleToggleStatus = () => {
        // B1:tim kiem vi tri cua nhan vien 
        const findIndexEmployee =  employeeList.findIndex((employee : Employee) => employee.id === idToggle)
        // b2: cap nhat trang thai cua nhan vien trong mang tai vi tri tim thay 
        if(findIndexEmployee !== -1){
            employeeList[findIndexEmployee].status = !employeeList[findIndexEmployee].status
        }
        // b3:luu tru du lieu moi tren localStorage
        saveData("employees", employeeList)
        // b4:dong modal
        setShowModalToggle(false)
        // b5:cap nhat lai danh sach 
    }
    
    return (
      <>
        {showForm && <Form onClose={handleCloseForm} />}

        {/* Component modal xac nhan xoa*/}
        {showModal && (
          <Modal
            title="Xác nhận"
            content={
              <>
                Bạn có chắc chắn muốn xóa <strong>{employeeNameDel}</strong>{" "}
                này?
              </>
            }
            onClose={handleCloseModal}
            onConfirm={handleDeleteEmployee}
          />
        )}
        {/* Component xac nhan chan / bo chan */}
        {showModalToggle && (
          <Modal
            title="Xác nhận"
            content={
              <>
                Bạn có chắc chắn muốn{" "}
                {employeeInfo?.status ? "chặn" : "bỏ chặn"}{" "}
                <strong>{employeeInfo?.employeeName}</strong> này?
              </>
            }
            onClose={handleCloseModalToggle}
            onConfirm={handleToggleStatus}
          />
        )}

        <div className="w-[80%] m-auto mt-4 h-[100vh]">
          <main className="main">
            <header className="d-flex justify-content-between mb-3">
              <h3>Nhân viên</h3>
              <Button
                onClick={() => handleShowForm()}
                title="Thêm mới nhân viên"
                type="primary"
                size="sm"
              ></Button>
            </header>
            <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
              <Input
                type="text"
                placeholder="Tìm kiếm theo email"
                style={{ width: 350 }}
                onChange={handleSearch}
              />
              <i className="fa-solid fa-arrows-rotate" title="Refresh" />
            </div>
            {/* Danh sách nhân viên */}
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr className="text-center">
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Ngày sinh</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Trạng thái</th>
                  <th colSpan={3}>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee: Employee, index: number) => (
                  <tr key={employee.id}>
                    <EmployeeItem
                      toggleStatus={handleShowModalToggle}
                      showModal={handleShowModal}
                      employee={employee}
                      index={index}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
            <footer className="d-flex justify-content-end align-items-center gap-3">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </footer>
          </main>
        </div>
      </>
    );
}

export default ListEmployee