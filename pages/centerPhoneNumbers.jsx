import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { updateItem } from "utils/updateItem";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import { centerPhoneTypeDataClass } from "class/staticDropdownOptions";
import CenterPhoneNumbersList from "components/dashboard/centers/centerPhoneNumbers/centerPhoneNumbersList";
import AddPhoneNumberModal from "components/dashboard/centers/centerPhoneNumbers/addPhoneNumberModal";
import EditPhoneNumberModal from "components/dashboard/centers/centerPhoneNumbers/editPhoneNumberModal";

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
const CenterPhoneNumbers = ({ UserData }) => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumbersList, setPhoneNumbersList] = useState([]);
  const [phoneTypeOptions, setPhoneTypeOptions] = useState(
    centerPhoneTypeDataClass
  );
  const [hiddenData, setHiddenData] = useState(null);
  const [editPhoneNumberData, setEditPhoneNumberData] = useState([]);

  // Get all of centers phoneNumbers
  const getAllPhoneNumbers = () => {
    CenterID = Router.query.id;
    let url = `CenterProfile/getCenterPhones/${CenterID}`;
    setIsLoading(true);

    if (CenterID) {
      axiosClient
        .get(url)
        .then(function (response) {
          setPhoneNumbersList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  let selectedPhoneType = "";
  const FUSelectPhoneType = (phoneType) => {
    selectedPhoneType = phoneType;
  };

  // Add PhoneNumber
  const addPhoneNumber = (e) => {
    e.preventDefault();
    setIsLoading(true);

    CenterID = Router.query.id;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterProfile/AddPhones";
    let data = {
      CenterID: CenterID,
      Text: formProps.addCenterTel,
      Type: selectedPhoneType,
    };

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          setPhoneNumbersList([...phoneNumbersList, response.data]);

          setIsLoading(false);
          $("#addCenterPhoneModal").modal("hide");
          e.target.reset();
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          ErrorAlert("خطا", "افزودن شماره تلفن با خطا مواجه گردید!");
        });
    }
  };

  // edit phone number
  const updatePhoneNumber = (data) => {
    setEditPhoneNumberData(data);
    $("#editCenterPhoneModal").modal("show");
  };

  const editPhoneNumber = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "CenterProfile/UpdatePhones";
    CenterID = Router.query.id;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let data = {
      CenterID: CenterID,
      PhonesID: formProps.editCenterPhoneeID,
      Text: formProps.editCenterPhoneNumber,
      Type: formProps.editPhoneType,
    };

    if (CenterID) {
      axiosClient
        .put(url, data)
        .then((response) => {
          updateItem(
            formProps.editCenterPhoneeID,
            response.data,
            phoneNumbersList,
            setPhoneNumbersList
          );
          $("#editCenterPhoneModal").modal("hide");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }

  // delete phone number
  const deletePhoneNumber = async (id) => {
    let result = await QuestionAlert(
      "حذف شماره!",
      "آیا از حذف شماره مرکز مطمئن هستید"
    );

    if (result) {
      setIsLoading(true);
      let url = "CenterProfile/DeletePhones";
      CenterID = Router.query.id;
      let data = {
        CenterID: CenterID,
        PhonesID: id,
      };

      if (CenterID) {
        await axiosClient
          .delete(url, { data })
          .then(function () {
            setPhoneNumbersList(phoneNumbersList.filter((a) => a._id !== id));
            setIsLoading(false);
          })
          .catch(function (error) {
            console.log(error);
            setIsLoading(false);
          });
      }
    }
  };

  useEffect(() => {
    if (Router.isReady)
      CenterID = Router.query.id;
    getAllPhoneNumbers();

    setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));
    if (hiddenData) localStorage.removeItem("hiddenData")

  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>شماره تلفن های مرکز</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addCenterPhoneModal"
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

          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <p className="card-title font-14 text-secondary">
                        لیست شماره تلفن های مرکز {""} {hiddenData?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <CenterPhoneNumbersList
                    data={phoneNumbersList}
                    deletePhoneNumber={deletePhoneNumber}
                    updatePhoneNumber={updatePhoneNumber}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddPhoneNumberModal
        addPhoneNumber={addPhoneNumber}
        FUSelectPhoneType={FUSelectPhoneType}
        phoneTypeOptions={phoneTypeOptions}
      />

      <EditPhoneNumberModal
        data={editPhoneNumberData}
        editPhoneNumber={editPhoneNumber}
        phoneTypeOptions={phoneTypeOptions}
        FUSelectPhoneType={FUSelectPhoneType}
      />
    </>
  );
};

export default CenterPhoneNumbers;
