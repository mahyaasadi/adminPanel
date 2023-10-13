import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { axiosClient } from "class/axiosConfig";
import Loading from "@/components/commonComponents/loading/loading";
import { ErrorAlert, SuccessAlert } from "class/AlertManage.js";
import SubDepartmentsList from "components/dashboard/subDepartments/subDepartmentsList";
import DepartmentsHeader from "components/dashboard/subDepartments/departmentsHeader/departmentsHeader";
import { getSession } from "lib/session";

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
let modalityData = [];
let modalityFistItem = [];
let checkedDepItems = [];

const SubDepartments = ({ UserData }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [hiddenData, setHiddenData] = useState(null);
  const [selectAllMode, setSelectAllMode] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState([]);
  const [currentSubDepartments, setCurrentSubDepartments] = useState([]);
  const [subDepartmentCheckboxStatus, setSubDepartmentCheckboxStatus] =
    useState({
      subDepartmentsOptions: [],
    });

  // get all departments
  const getDepartments = () => {
    setIsLoading(true);

    CenterID = router.query.id;
    let url = `Center/GetDepartments/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        checkedDepItems = response.data.filter((depItem) => depItem.Checked);
        modalityFistItem = checkedDepItems[0]._id;

        console.log({ modalityFistItem });
        setSelectedDepartments(checkedDepItems);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // get all modalities
  const getModalities = () => {
    setIsLoading(true);
    let url = "Modality/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        modalityData = response.data;
        handleDepartmentClick(modalityFistItem);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // get subDeps related to each department
  const handleDepartmentClick = (departmentId) => {
    setIsLoading(true);

    const correspondingModality = modalityData.find(
      (mod) => mod._id === departmentId
    );

    if (correspondingModality) {
      setCurrentSubDepartments(correspondingModality.Sub);
      setIsLoading(false);
    } else {
      setCurrentSubDepartments([]);
      setIsLoading(false);
    }
  };

  // subDeps checkbox
  const handleCheckedSubDepartments = (e) => {
    const { value, checked } = e.target;
    const { subDepartmentsOptions } = subDepartmentCheckboxStatus;

    // console.log(`${value} is ${checked}`);

    checked
      ? setSubDepartmentCheckboxStatus({
        subDepartmentsOptions: [...subDepartmentsOptions, value],
      })
      : setSubDepartmentCheckboxStatus({
        subDepartmentsOptions: subDepartmentsOptions.filter(
          (e) => e !== value
        ),
      });
  };

  const checkAllSubDeps = () => {
    setSelectAllMode(true);
    $(".subDepartment").prop("checked", true);
    const allSubDepIds = currentSubDepartments.map((subDep) => subDep._id);
    setSubDepartmentCheckboxStatus({ subDepartmentsOptions: allSubDepIds });
  };

  const unCheckAllSubDeps = () => {
    setSelectAllMode(false);
    $(".subDepartment").prop("checked", false);
    setSubDepartmentCheckboxStatus({ subDepartmentsOptions: [] });
  };

  const handleSubmitSubCheckbox = (e) => {
    e.preventDefault();
    setSubmitIsLoading(true);

    // checked items
    const checkedItems = subDepartmentCheckboxStatus.subDepartmentsOptions;

    // unchecked items
    const uncheckedItems = currentSubDepartments
      .map((item) => item._id)
      .filter((id) => !checkedItems?.includes(id));

    const result = {
      checked: checkedItems,
      unChecked: uncheckedItems,
    };

    let url = "Center/SubDepartment";
    const data = {
      CenterID: CenterID,
      subDepartment: result,
    };

    // console.log({ data });

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        SuccessAlert("موفق", "ثبت زیر بخش های مرکز با موفقیت انجام گردید!");
        setSubmitIsLoading(false);
        setSelectAllMode(false);

        setTimeout(() => {
          getSelectedSubDepartments()
        }, 50);
      })
      .catch((err) => {
        console.log(err);
        ErrorAlert("خطا", "ثبت زیر بخش های مرکز با خطا مواجه گردید!");
        setSubmitIsLoading(false);
      });
  };

  const getSelectedSubDepartments = () => {
    setIsLoading(true);
    let url = `Center/SubDepartment/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSelectedSubDepartments(response.data);
        const selectedIds = response.data.map((item) => item._id);
        setSubDepartmentCheckboxStatus({ subDepartmentsOptions: selectedIds });

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (router.isReady) {
      CenterID = router.query.id;
      getDepartments();
      getModalities();
      getSelectedSubDepartments();
      if (!CenterID) return null;

      setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>مدیریت زیربخش ها</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <DepartmentsHeader
            data={selectedDepartments}
            handleDepartmentClick={handleDepartmentClick}
          />

          {isLoading ? (
            <Loading />
          ) : (
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="p-4 marginb-3 d-flex justify-center">
                    <div className="row align-items-center">
                      <div className="col">
                        <p className="card-title font-16 text-secondary">
                          {" "}
                          زیربخش های مرکز
                          {""} {hiddenData?.name}
                        </p>
                      </div>
                      <div className="col-auto d-flex flex-wrap">
                        <div className="form-custom me-2">
                          <div
                            id="tableSearch"
                            className="dataTables_wrapper"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <SubDepartmentsList
                    data={currentSubDepartments}
                    handleCheckedSubDepartments={handleCheckedSubDepartments}
                    checkAllSubDeps={checkAllSubDeps}
                    unCheckAllSubDeps={unCheckAllSubDeps}
                    selectAllMode={selectAllMode}
                    handleSubmitSubCheckbox={handleSubmitSubCheckbox}
                    selectedSubDepartments={selectedSubDepartments}
                    checkedSubDepartments={
                      subDepartmentCheckboxStatus.subDepartmentsOptions
                    }
                    submitIsLoading={submitIsLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubDepartments;
