import { UserInfo } from "../Component/UserInfo";
import { useState } from "react";

export const TodoApp = () => {
  const [formdata, setformdata] = useState({
    Name: "",
    Age: "",
    City: "",
    Address: "",
  });


 






  return (
    <>
      <div className="container mt-4">
        <div className="rows">
          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Name "
              onChange={(e) =>
                setformdata({
                  ...formdata,
                  Name: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="rows">
          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Age
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Age"
              onChange={(e) =>
                setformdata({
                  ...formdata,
                  Age: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="rows">
          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              City
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Decimals"
              onChange={(e) =>
                setformdata({
                  ...formdata,
                  City: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="rows">
          <div className="col-sm-6 mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Address"
              onChange={(e) =>
                setformdata({
                  ...formdata,
                  Address: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="rows">
          <div className="col-sm-8">
            <UserInfo
              detail={{
                name: formdata.Name,
                age: formdata.Age,
                address: formdata.Address,
                city: formdata.City,
              }}
            />
          </div>
        </div>
      </div>

     
    </>
  );
};
