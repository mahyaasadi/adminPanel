import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ClinicUserModal from "components/dashboard/clinics/clinicUserModal";
import ClinicUsersListTable from "components/dashboard/clinics/clinicUsersListTable";

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

let ActiveClinicName,
  ActiveClinicID = null;
const ClinicUsersManagement = ({ UserData }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [clinicUserData, setClinicUserData] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [showModal, setShowModal] = useState(false);
  const [editClinicUserData, setEditClinicUserData] = useState([]);
  const [eye, setEye] = useState(true);
  const [password, setPassword] = useState("");
  const [showValidationText1, setShowValidationText1] = useState(false);
  const [showValidationText2, setShowValidationText2] = useState(false);
  const [showValidationText3, setShowValidationText3] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const onEyeClick = () => setEye(!eye);
  const handlePassword = (e) => setPassword(e.target.value);

  // get all clinic Users
  const getClinicUsers = () => {
    setIsLoading(true);
    let url = `ClinicUser/getClincUsers/${ActiveClinicID}`;

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setClinicUserData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // add clinicUser
  const openAddClinicUser = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const addClinicUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "ClinicUser/addUser";
    let data = {
      ClinicID: ActiveClinicID,
      User: formProps.cliniceUserUserName,
      Password: password,
      FullName: formProps.clinicUserFullName,
      NickName: formProps.cliniceUserNickName,
      NID: formProps.clinicUserNID,
      Tel: formProps.clinicUserTel,
    };

    axiosClient
      .post(url, data)
      .then((response) => {
        setClinicUserData([...clinicUserData, response.data]);

        setShowModal(false);
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // edit clinicUser
  const updateClinicUser = (data) => {
    setShowModal(true);
    setModalMode("edit");
    setEditClinicUserData(data);
  };

  const editClinicUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = `ClinicUser/updateUser`;
    let data = {
      ClinicID: ActiveClinicID,
      UserID: formProps.clinicUserID,
      User: formProps.cliniceUserUserName,
      FullName: formProps.clinicUserFullName,
      NickName: formProps.cliniceUserNickName,
      NID: formProps.clinicUserNID,
      Tel: formProps.clinicUserTel,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateUserItem(formProps.clinicUserID, response.data);
        setShowModal(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const updateUserItem = (id, newArr) => {
    let index = clinicUserData.findIndex((x) => x._id === id);
    let g = clinicUserData[index];
    g = newArr;

    if (index === -1) {
      console.log("no match");
    } else
      setClinicUserData([
        ...clinicUserData.slice(0, index),
        g,
        ...clinicUserData.slice(index + 1),
      ]);
  };

  // change active state
  const changeActiveClinicUser = (id, type) => {
    let findUser = clinicUserData.find((x) => x._id === id);
    findUser.Deactive = type;
    let findIndex = clinicUserData.findIndex((x) => x._id === id);
    clinicUserData[findIndex] = findUser;
    setClinicUserData(clinicUserData);
    getClinicUsers();
  };

  // Activate clinicUser
  const activateClinicUser = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت غیر فعال کاربر!",
      "آیا از فعال کردن کاربر اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);
      let url = "ClinicUser/ActiveUser";
      let data = {
        UserID: id,
      };

      await axiosClient
        .put(url, data)
        .then((response) => {
          changeActiveClinicUser(id, true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش وضعیت کاربر با خطا مواجه گردید!");
          setIsLoading(false);
        });
    }
  };

  // Deactivate clinicUser
  const deActivateClinicUser = async (id) => {
    let result = await QuestionAlert(
      "تغییر وضعیت فعال کاربر!",
      "آیا از غیر فعال کردن کاربر اطمینان دارید؟"
    );

    if (result) {
      setIsLoading(true);

      let url = "ClinicUser/deActiveUser";
      let data = {
        UserID: id,
      };

      await axiosClient
        .put(url, data)
        .then((response) => {
          changeActiveClinicUser(id, false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          ErrorAlert("خطا", "ویرایش وضعیت کاربر با خطا مواجه گردید!");
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (router.isReady) {
      ActiveClinicName = router.query.name;
      ActiveClinicID = router.query.id;
    }
  }, [router.isReady]);

  useEffect(() => getClinicUsers(), []);

  return (
    <>
      <Head>
        <title>مدیریت کاربران مطب ها</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <button
                  onClick={openAddClinicUser}
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
                        لیست کاربران کلینیک {ActiveClinicName}
                      </p>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <ClinicUsersListTable
                    data={clinicUserData}
                    updateClinicUser={updateClinicUser}
                    activateClinicUser={activateClinicUser}
                    deActivateClinicUser={deActivateClinicUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <ClinicUserModal
          mode={modalMode}
          show={showModal}
          onHide={handleCloseModal}
          isLoading={isLoading}
          data={editClinicUserData}
          onSubmit={modalMode === "add" ? addClinicUser : editClinicUser}
          eye={eye}
          onEyeClick={onEyeClick}
          password={password}
          handlePassword={handlePassword}
          showValidationText1={showValidationText1}
          showValidationText2={showValidationText2}
          showValidationText3={showValidationText3}
          setShowValidationText1={setShowValidationText1}
          setShowValidationText2={setShowValidationText2}
          setShowValidationText3={setShowValidationText3}
        />
      </div>
    </>
  );
};

export default ClinicUsersManagement;
