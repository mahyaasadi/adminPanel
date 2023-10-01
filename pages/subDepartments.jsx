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

  //get departments
  const getDepartments = () => {
    CenterID = router.query.id;
    setIsLoading(true);

    let url = `Center/GetDepartments/${CenterID}`;

    axiosClient
      .get(url)
      .then((response) => {
        // console.log(response.data);
        let checkedDepItems = [];
        for (let i = 0; i < response.data.length; i++) {
          const depItem = response.data[i];
          if (depItem.Checked === true) {
            checkedDepItems.push(depItem);
          }
          setSelectedDepartments(checkedDepItems);
        }

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
    let url = "Modality/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log("modalities", response.data);
        setIsLoading(false);
        setModalityData(response.data);
        // let subModalities = [];
        // for (let i = 0; i < response.data.length; i++) {
        //   const element = response.data[i];
        //   subModalities.push(element._id, element.FullName);
        // }
        // console.log({ subModalities });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const getSubDepartments = (data) => {
    // const findSubDep
    // selectedDepartments.map(
    //   (depItem) => depItem._id == modalityData._id
    // );
    // console.log({ findSubDep });

    console.log({ data });
    let selectedDepartmentsIDs = [];
    selectedDepartments.map((depItem) =>
      selectedDepartmentsIDs.push(depItem._id)
    );
    // console.log({ selectedDepartmentsIDs });

    // const findSubDepItems = modalityData.find()
    if (modalityData.map((x) => x._id == data?._id)) {
      console.log("exist");
      // console.log(x);
      // setSubDepartmentsData(data);
    }

    // let selectedModalitiesIDs = [];
    // modalityData.map((modalityItem) =>
    //   selectedModalitiesIDs.push(modalityItem._id)
    // );
    // console.log({ selectedModalitiesIDs });

    // const findSubDep = modalityData.map((x) =>
    //   x.includes(selectedDepartmentsIDs)
    // );
    // console.log({ findSubDep });
  };

  console.log({ selectedDepartments });

  useEffect(() => {
    if (router.isReady) {
      CenterID = router.query.id;
      getDepartments();
      getModalities();
      getSubDepartments();
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
            getSubDepartments={getSubDepartments}
          />

          {isLoading ? (
            <Loading />
          ) : (
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <SubDepartmentsList data={subDepartmentsData} />
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
