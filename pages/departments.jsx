import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import { axiosClient } from "class/axiosConfig.js";
import { useRouter } from "next/router";
import Loading from "components/commonComponents/loading/loading";
import { SuccessAlert } from "class/AlertManage.js";
import DepartmentsList from "components/dashboard/departments/departmentsList";

export const getServerSideProps = async ({ req, res }) => {
  const result = getSession(req, res);

  if (result) {
    const { UserData } = result;
    return { props: { UserData } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: `/`,
      },
    };
  }
};

let CenterID = null;
const Departments = ({ UserData }) => {
  const Router = useRouter();

  const [departmentsData, setDepartmentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [depIsLoading, setDepIsLoading] = useState(false);

  const [departmentsCheckboxStatus, setDepartmentsCheckboxStatus] = useState({
    departmentsOptionsList: [],
  });

  const [modalityData, setModalityData] = useState([]);
  const [hiddenData, setHiddenData] = useState(null);

  // departments checkbox
  const handleCheckedDepartments = (e) => {
    const { value, checked } = e.target;
    const { departmentsOptionsList } = departmentsCheckboxStatus;

    checked
      ? setDepartmentsCheckboxStatus({
          departmentsOptionsList: [...departmentsOptionsList, value],
        })
      : setDepartmentsCheckboxStatus({
          departmentsOptionsList: departmentsOptionsList.filter(
            (e) => e !== value
          ),
        });
  };

  function getModality() {
    setIsLoading(true);

    let url = "Modality/getAll";
    axiosClient
      .get(url)
      .then(function (response) {
        setModalityData(response.data);
        setDepartmentsData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  //get departments
  const getDepartments = () => {
    CenterID = Router.query.id;
    setIsLoading(true);

    let UrlGetDep = `Center/GetDepartments/${CenterID}`;
    axiosClient
      .get(UrlGetDep)
      .then((response) => {
        if (response.data.length !== 0) {
          getModality();
          setIsLoading(false);
          setDepartmentsData(modalityData.concat(response.data));
        } else {
          getModality();
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const SubmitFrmSetDepartment = (e) => {
    e.preventDefault();
    setDepIsLoading(true);

    CenterID = Router.query.id;
    let selectedDepartments = [];
    let data = $(".checkbox-input:checked").serialize();
    data = data.split("&");

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

    let url = "Center/SetDepartments";
    let PostData = {
      CenterID: CenterID,
      Departments: departmentsData,
    };

    axiosClient
      .post(url, PostData)
      .then((response) => {
        setDepIsLoading(false);
        SuccessAlert("موفق !", "ذخیره اطلاعات با موفقیت انجام گردید");
      })
      .catch((error) => {
        console.log(error);
        setDepIsLoading(false);
      });
  };

  useEffect(() => {
    if (Router.isReady) {
      CenterID = Router.query.id;
      getDepartments();
      setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));

      if (hiddenData) {
        localStorage.removeItem("hiddenData");
      }
    }
  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>انتخاب بخش های مرکز</title>
      </Head>
      <div className="page-wrapper font-13">
        <div className="content container-fluid">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="departments-container">
              <div className="p-4 border-bottom-0 d-flex justify-center">
                <div className="row align-items-center">
                  <div className="col">
                    <p className="card-title font-17 text-secondary">
                      {" "}
                      بخش های مرکز
                      {""} {hiddenData?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="checkbox-group-legend">
                بخش مورد نظر را انتخاب نمایید
              </div>

              <form
                className="SubmitDepartmentForm"
                onSubmit={SubmitFrmSetDepartment}
              >
                <div className="box-container">
                  <DepartmentsList
                    departmentsData={departmentsData}
                    handleCheckedDepartments={handleCheckedDepartments}
                  />
                </div>

                <div className="submitDepartments-btn d-flex justify-center w-100">
                  {!depIsLoading ? (
                    <button className="btn btn-secondary rounded col-lg-4 col-7">
                      ثبت
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary rounded col-lg-4 col-7"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm margin-right-1"
                        role="status"
                      ></span>
                      در حال ثبت
                    </button>
                  )}
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
