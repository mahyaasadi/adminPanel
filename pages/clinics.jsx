import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { convertBase64 } from "utils/convertBase64";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ClinicModal from "components/dashboard/clinics/clinicModal";
import ClinicListTable from "components/dashboard/clinics/clinicListTable";

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

let ActiveClinicID = null;
const Clinics = ({ UserData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clinicData, setClinicData] = useState([]);
  const [editClinicData, setEditClinicData] = useState([]);
  const [expireDate, setExpireDate] = useState("");
  const [modalMode, setModalMode] = useState("add");
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const setClinicExpireDateInDB = (newDate) => setExpireDate(newDate);

  // get clinics list
  const getClinicsData = () => {
    let url = "Clinic/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then(function (response) {
        console.log(response.data);
        setClinicData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "!خطا در دریافت اطلاعات مطب ها");
      });
  };

  // add clinic
  const openAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  let clinicLogo = null;
  const addClinic = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (formProps.clinicLogo && formProps.clinicLogo.size != 0) {
      clinicLogo = await convertBase64(formProps.clinicLogo);
    }

    let url = "Clinic/add";
    let data = {
      Name: formProps.clinicName,
      ManageTel: formProps.clinicManageTel,
      Address: formProps.clinicAddress,
      ExpireDate: expireDate,
      Logo: clinicLogo,
    };

    console.log({ data });

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setClinicData([...clinicData, response.data]);

        // reset
        e.target.reset();
        clinicLogo = null;
        $("#clinicLogo").val("");
        $("#logoUploadPreview").attr("src", "");

        setShowModal(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن مطب با خطا مواجه گردید!");
      });
  };

  // edit clinic
  const updateClinic = (data, clinicID) => {
    setEditClinicData(data);
    setModalMode("edit");
    setShowModal(true);
    ActiveClinicID = clinicID;
  };

  let newClinicLogo = null;
  const editClinic = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    if (ActiveClinicID) {
      if (formProps.clinicLogo && formProps.clinicLogo.size != 0) {
        newClinicLogo = await convertBase64(formProps.clinicLogo);
      }

      let url = `Clinic/update/${ActiveClinicID}`;
      let data = {
        Name: formProps.clinicName,
        ManageTel: formProps.clinicManageTel,
        Address: formProps.clinicAddress,
        ExpireDate: expireDate,
        Logo: newClinicLogo ? newClinicLogo : formProps.currentLogo,
      };

      console.log({ data });

      axiosClient
        .put(url, data)
        .then((response) => {
          console.log(response.data);
          updateClinicItem(formProps.clinicID, response.data);
          setShowModal(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
        });
    }
  };

  const updateClinicItem = (id, newArr) => {
    let index = clinicData.findIndex((x) => x._id === id);
    let g = clinicData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setClinicData([
        ...clinicData.slice(0, index),
        g,
        ...clinicData.slice(index + 1),
      ]);
  };

  // remove clinic
  const deleteClinic = async (id) => {
    let result = await QuestionAlert(
      "حذف مطب!",
      "آیا از حذف مطب اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = `Clinic/delete/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          if (response.data && response.data.Deleted) {
            const updatedClinicData = clinicData.map((clinic) => {
              if (clinic._id === id) {
                return { ...clinic, Deleted: true };
              }
              return clinic;
            });
            setClinicData(updatedClinicData);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const reActivateClinic = async (id) => {
    let result = await QuestionAlert(
      "فعال سازی !",
      "?آیا از فعال سازی کلینیک مطمئن هستید"
    );

    if (result) {
      setIsLoading(true);
      let url = `Clinic/Active/${id}`

      axiosClient.put(url)
        .then((response) => {
          if (response.data.Deleted === false) {
            const activatedClinicData = clinicData.map((clinic) => {
              if (clinic._id === id) {
                return { ...clinic, Deleted: false };
              }
              return clinic;
            });
            setClinicData(activatedClinicData);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    }
  }

  useEffect(() => getClinicsData(), []);

  return (
    <>
      <Head>
        <title>مدیریت مطب ها</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  onClick={openAddModal}
                  className="btn btn-primary btn-add font-14"
                >
                  <i className="me-1">
                    <FeatherIcon icon="plus-square" />
                  </i>{" "}
                  اضافه کردن
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <p className="card-title font-14 text-secondary">
                        لیست مطب ها
                      </p>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <ClinicListTable
                    data={clinicData}
                    updateClinic={updateClinic}
                    deleteClinic={deleteClinic}
                    reActivateClinic={reActivateClinic}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <ClinicModal
          mode={modalMode}
          show={showModal}
          onHide={handleCloseModal}
          isLoading={isLoading}
          data={editClinicData}
          onSubmit={modalMode === "add" ? addClinic : editClinic}
          setClinicExpireDateInDB={setClinicExpireDateInDB}
        />
      </div>
    </>
  );
};

export default Clinics;
