import { useEffect, useState } from "react";

import "./styles.css";

export function Employeedata() {
  const [employees, setemployees] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const itemsinpage = 10;
  const fetchdata = async () => {
    try {
      const res = await fetch(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      if (!res.ok) {
        throw new Error("Network response is not ok");
      }
      const data = await res.json();
      console.log(data);
      setemployees(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handlenext = () => {
    if (currentPage < Math.ceil(employees.length / itemsinpage)) {
      setcurrentPage(currentPage + 1);
    }
  };
  const handleprevious = () => {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const lastemployeeindex = currentPage * itemsinpage;
  const firstemployeeindex = lastemployeeindex - itemsinpage;
  const currentemployees = employees.slice(
    firstemployeeindex,
    lastemployeeindex
  );
  return (
    <div>
      <h1>Employee Data Table</h1>
      <div className="tablecomponent">
        <table>
          <thead>
            <tr className="heading">
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentemployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <footer>
          <button onClick={handleprevious} disabled={currentPage === 1}>
            Previous
          </button>
          <button>{currentPage}</button>

          <button
            onClick={handlenext}
            disabled={currentPage === Math.ceil(employees.length / itemsinpage)}
          >
            Next
          </button>
        </footer>
      </div>
    </div>
  );
}
