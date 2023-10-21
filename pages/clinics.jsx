import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
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
  const [expireDate, setExpireDate] = useState("")
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
        ErrorAlert("خطا", "!خطا در دریافت اطلاعات کلینیک ها");
      });
  };

  // Convert logoUrl to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
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
        ErrorAlert("خطا", "افزودن کلینیک با خطا مواجه گردید!");
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
        Logo: newClinicLogo,
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
      "حذف کلینیک !",
      "?آیا از حذف کلینیک مطمئن هستید"
    );

    if (result) {
      setIsLoading(true);
      let url = `Clinic/delete/${id}`;

      await axiosClient
        .delete(url)
        .then((response) => {
          console.log(response.data);

          if (response.data && response.data.Deleted) {
            const updatedClinicData = clinicData.map(clinic => {
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

  useEffect(() => getClinicsData(), []);

  return (
    <>
      <Head>
        <title>مدیریت کلینیک ها</title>
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
                        لیست کلینیک ها
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