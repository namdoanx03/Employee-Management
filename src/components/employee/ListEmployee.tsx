import React, { useState } from 'react'
import EmployeeItem from './EmployeeItem';
import Button from '../base/Button';
import Form from '../base/Form';
import Input from '../base/Input';

const ListEmployee = () => {
    const [showForm, setShowForm] = useState<boolean>(false)
    //hien thi form
    const handleShowForm = (): void => {
        setShowForm(true)
    }
    //dong form
    const handleCloseForm = (): void => {
      setShowForm(false);
    };
    const handleSearch = () => {
        console.log("search")
    }
    return (
      <>
        {showForm && <Form onClose={handleCloseForm}/>}
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
              <EmployeeItem />
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