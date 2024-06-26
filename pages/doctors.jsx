import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { updateItem } from "utils/updateItem";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import DoctorsListTable from "components/dashboard/doctors/doctorsListTable";
import AddDoctorModal from "components/dashboard/doctors/addDoctorModal";
import EditDoctorModal from "components/dashboard/doctors/editDoctorModal";

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
const DoctorsList = ({ UserData }) => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);
  const [editDoctor, setEditDoctor] = useState({});
  const [hiddenData, setHiddenData] = useState(null);

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

    axiosClient
      .put(url, Data)
      .then((response) => {
        updateItem(
          formProps.EditDoctorID,
          response.data,
          doctorsList,
          setDoctorsList
        );
        $("#editPhysicianModal").modal("hide");
      })
      .catch((error) => {
        console.log(error);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
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

      setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));
      if (hiddenData) localStorage.removeItem("hiddenData");

      getDoctorsData();
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
                      <p className="card-title font-14 text-secondary">
                        {" "}
                        لیست پزشکان
                        {""} {hiddenData?.name}
                      </p>
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