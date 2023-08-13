import { useState, useEffect } from "react";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
// import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Loading from "components/commonComponents/loading/loading";
import { SuccessAlert } from "class/AlertManage.js";
import DepartmentsList from "components/dashboard/departments/departmentsList";

// let CenterID = Cookies.get("CenterID");
let CenterID = null;

const Departments = () => {
  const Router = useRouter();

  const [departmentsData, setDepartmentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const SubmitFrmSetDepartment = (e) => {
    e.preventDefault();
    CenterID = Router.query.id;

    let data = $(".checkbox-input:checked").serialize();
    data = data.split("&");
    let selectedDepartments = [];

    data.map((dep) => {
      let depId = dep.replace("Dep=", "");
      var foundIndex = departmentsData.findIndex((x) => x._id == depId);
      selectedDepartments.push(foundIndex);
      let arr = departmentsData[foundIndex];
      arr.Checked = 1;
      departmentsData[foundIndex] = arr;
    });

    departmentsData.forEach((dep, index) => {
      if (!selectedDepartments.includes(index)) {
        let arr = departmentsData[index];
        arr.Checked = 0;
        departmentsData[index] = arr;
      }
    });

    console.log("selectedDepartments", selectedDepartments);

    let url = "Center/SetDepartments";
    let PostData = {
      CenterID: CenterID,
      Departments: departmentsData,
    };

    axiosClient
      .post(url, PostData)
      .then((response) =>
        SuccessAlert("موفق !", "ذخیره اطلاعات با موفقیت انجام گردید")
      )
      .catch((error) => {
        console.log(error);
      });
  };

  //get departments
  const getDepartments = () => {
    CenterID = Router.query.id;
    setIsLoading(true);

    let UrlGetDep = `Center/GetDepartments/${CenterID}`;
    axiosClient
      .get(UrlGetDep)
      .then((response) => {
        if (response.data.length > 0) {
          setIsLoading(false);
          console.log(response.data);
          setDepartmentsData(response.data);
        } else {
          getModality();
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  function getModality() {
    let url = "Modality/getAll";
    setIsLoading(true);
    axiosClient.get(url).then(function (response) {
      setIsLoading(false);
      setDepartmentsData(response.data);
    });
  }

  useEffect(() => {
    if (Router.isReady) {
      CenterID = Router.query.id;
      getDepartments();
      if (!CenterID) return null;
    }
  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>انتخاب بخش</title>
      </Head>
      <div className="page-wrapper font-13">
        <div className="content container-fluid">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="departments-container">
              <div className="checkbox-group-legend">
                بخش مورد نظر را انتخاب نمایید
              </div>

              <form
                className="SubmitDepartmentForm"
                onSubmit={SubmitFrmSetDepartment}
              >
                <div className="box-container">
                  <DepartmentsList departmentsData={departmentsData} />
                </div>
                <div className="submitDepartments-btn d-flex justify-center w-100">
                  <button className="btn btn-sm btn-secondary rounded col-lg-4 col-7">
                    ثبت
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Departments;
