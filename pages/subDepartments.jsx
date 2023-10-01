import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { axiosClient } from "class/axiosConfig";
import Loading from "components/commonComponents/loading/loading";
import FeatherIcon from "feather-icons-react";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import DepartmentsHeader from "components/dashboard/subDepartments/departmentsHeader/departmentsHeader";
import SubDepartmentsList from "components/dashboard/subDepartments/subDepartmentsList";

let CenterID = null;
const SubDepartments = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [subDepartmentsData, setSubDepartmentsData] = useState([]);
  const [modalityData, setModalityData] = useState([]);
  const [currentSubDepartments, setCurrentSubDepartments] = useState([]);


  //get departments
  const getDepartments = () => {
    setIsLoading(true);

    CenterID = router.query.id;
    let url = `Center/GetDepartments/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        const checkedDepItems = response.data.filter(depItem => depItem.Checked);
        setSelectedDepartments(checkedDepItems);

        // if (response.data.length !== 0) {
        //   getModality();
        //   setDepartmentsData(modalityData.concat(response.data));
        // } else {
        //   getModality();
        // }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const getModalities = () => {
    setIsLoading(true);
    let url = "Modality/getAll";

    axiosClient
      .get(url)
      .then((response) => {
        console.log("modalities", response.data);
        setModalityData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleDepartmentClick = (departmentId) => {
    const correspondingModality = modalityData.find(mod => mod._id === departmentId);
    correspondingModality ? setCurrentSubDepartments(correspondingModality.Sub)
      : setCurrentSubDepartments([]);
  }


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
                <div className="card">
                  <SubDepartmentsList data={currentSubDepartments} />
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
