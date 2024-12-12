import { Employee } from "../../models/Employee";

type PropTypes = {
    index: number
    employee : Employee
}
const EmployeeItem = ({ index, employee} : PropTypes) => {
  return (
    <>
      <td>{index + 1}</td>
      <td>{employee.employeeName}</td>
      <td>{employee.dateOfBirth}</td>
      <td>{employee.email}</td>
      <td>{employee.address}</td>
      <td>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {employee.status ? (
            <>
              <div className="status status-active" />
              <span> Đang hoạt động</span>
            </>
          ) : (
            <>
              <div className="status status-stop" />
              <span> Ngừng hoạt động</span>
            </>
          )}
        </div>
      </td>
      <td>
        {employee.status ? (
          <span className="button button-block">Chặn</span>
        ) : (
          <span className="button button-block">Bỏ chặn</span>
        )}
      </td>
      <td>
        <span className="button button-edit">Sửa</span>
      </td>
      <td>
        <span className="button button-delete">Xóa</span>
      </td>
    </>
  );
}

export default EmployeeItem