import React, { useEffect, useState } from "react";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
// import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import DoctorsListTable from "components/dashboard/doctors/doctorsListTable/doctorsListTable";
import AddDoctorModal from "components/dashboard/doctors/addDoctorModal/addDoctorModal";
import EditDoctorModal from "components/dashboard/doctors/editDoctorModal/editDoctorModal";

// let CenterID = Cookies.get("CenterID");
let CenterID = null;

const DoctorsList = () => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);
  const [editDoctor, setEditDoctor] = useState({});

  //get doctors list
  const getDoctorsData = () => {
    CenterID = Router.query.id;
    let url = `CenterProfile/getCenterPhysician/${CenterID}`;
    setIsLoading(true);

    if (CenterID) {
      axiosClient
        .get(url)
        .then(function (response) {
          setDoctorsList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Add Physician
  const addPhysician = (e) => {
    e.preventDefault();
    CenterID = Router.query.id;

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let url = "CenterProfile/AddPhysician";

    let data = {
      CenterID: CenterID,
      Name: formProps.addPhysicianName,
      Title: formProps.addPhysicianTitle,
      Spe: formProps.addPhysicianSpe,
    };

    console.log("data", data);

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          setDoctorsList([...doctorsList, response.data]);
          $("#addPhysicianModal").modal("hide");
          e.target.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Edit Physician
  const editPhysician = (e) => {
    e.preventDefault();
    CenterID = Router.query.id;

    let url = "CenterProfile/UpdatePhysician";
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let Data = {
      CenterID: CenterID,
      PhysicianID: formProps.EditDoctorID,
      Name: formProps.EditDoctorName,
      Title: formProps.EditDoctorTitle,
      Spe: formProps.EditDoctorSpe,
    };

    // if (CenterID) {
    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(formProps.EditDoctorID, response.data);
        $("#editPhysicianModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
      });
    // }
  };

  const updateItem = (id, newArr) => {
    let index = doctorsList.findIndex((x) => x._id === id);
    let g = doctorsList[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setDoctorsList([
        ...doctorsList.slice(0, index),
        g,
        ...doctorsList.slice(index + 1),
      ]);
  };

  const updatePhysician = (data) => {
    setEditDoctor(data);
    $("#editPhysicianModal").modal("show");
  };

  // Delete Physician
  const deletePhysician = async (id) => {
    let result = await QuestionAlert(
      "حذف پزشک !",
      "?آیا از حذف پزشک مطمئن هستید"
    );

    if (result) {
      CenterID = Router.query.id;
      let url = "CenterProfile/DeletePhysician";
      let data = {
        CenterID: CenterID,
        PhysicianID: id,
      };

      if (CenterID) {
        await axiosClient
          .delete(url, { data })
          .then(function () {
            setDoctorsList(doctorsList.filter((a) => a._id !== id));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    if (Router.isReady) {
      CenterID = Router.query.id;
      console.log("CenterID", CenterID);
      getDoctorsData();
      if (!CenterID) return null;
    }
  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>پزشکان</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addPhysicianModal"
                  className="btn btn-primary btn-add font-14"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </Link>
              </div>
            </div>
          </div>

          {/* <!-- Doctors List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="card-title font-16">لیست پزشکان</h5>
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

                {isLoading ? (
                  <Loading />
                ) : (
                  <DoctorsListTable
                    data={doctorsList}
                    deletePhysician={deletePhysician}
                    updatePhysician={updatePhysician}
                  />
                )}
              </div>
              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>

        <AddDoctorModal addPhysician={addPhysician} />

        <EditDoctorModal data={editDoctor} editPhysician={editPhysician} />
      </div>
    </>
  );
};

export default DoctorsList;

