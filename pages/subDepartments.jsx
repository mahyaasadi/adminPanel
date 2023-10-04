import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosClient } from "class/axiosConfig";
import Loading from "components/commonComponents/loading/loading";
import FeatherIcon from "feather-icons-react";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import SubDepartmentsList from "components/dashboard/subDepartments/subDepartmentsList";
import DepartmentsHeader from "components/dashboard/subDepartments/departmentsHeader/departmentsHeader";

let CenterID = null;
let modalityData = [];
let modalityFistItem = [];
let checkedDepItems = []

const SubDepartments = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectAllMode, setSelectAllMode] = useState(false);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
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
        checkedDepItems = response.data.filter(
          (depItem) => depItem.Checked
        );
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

    console.log(`${value} is ${checked}`);

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
    const allSubDepIds = currentSubDepartments.map(subDep => subDep._id);
    setSubDepartmentCheckboxStatus({ subDepartmentsOptions: allSubDepIds });
  };

  const unCheckAllSubDeps = () => {
    setSelectAllMode(false);
    $(".subDepartment").prop("checked", false);
    setSubDepartmentCheckboxStatus({ subDepartmentsOptions: [] });
  };

  const handleSubmitSubCheckbox = (e) => {
    e.preventDefault();

    // checked items:
    const checkedItems = subDepartmentCheckboxStatus.subDepartmentsOptions;

    // unchecked items:
    const uncheckedItems = currentSubDepartments
      .map(item => item._id)
      .filter(id => !checkedItems?.includes(id));

    const result = [{
      checked: checkedItems,
      unChecked: uncheckedItems
    }]

    console.log({ result });

  };

  useEffect(() => {
    if (router.isReady) {
      CenterID = router.query.id;
      getDepartments();
      getModalities();
      if (!CenterID) return null;
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
                <div className="card subDepCard">
                  <SubDepartmentsList
                    data={currentSubDepartments}
                    handleCheckedSubDepartments={handleCheckedSubDepartments}
                    checkAllSubDeps={checkAllSubDeps}
                    unCheckAllSubDeps={unCheckAllSubDeps}
                    selectAllMode={selectAllMode}
                    handleSubmitSubCheckbox={handleSubmitSubCheckbox}
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
