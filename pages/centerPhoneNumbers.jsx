import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import centerPhoneTypeDataClass from "class/centerPhoneTypeDataClass.js";
import CenterPhoneNumbersList from "components/dashboard/centers/centerPhoneNumbers/centerPhoneNumbersList";
import AddPhoneNumberModal from "components/dashboard/centers/centerPhoneNumbers/addPhoneNumberModal/addPhoneNumberModal";
import EditPhoneNumberModal from "components/dashboard/centers/centerPhoneNumbers/editPhoneNumberModal/editPhoneNumberModal";

let CenterID = null;

const Insurance = () => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumbersList, setPhoneNumbersList] = useState([]);
  const [phoneTypeOptions, setPhoneTypeOptions] = useState(
    centerPhoneTypeDataClass
  );
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
          console.log(response.data);
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

    console.log("data", data);

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          console.log(response.data);
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

    console.log("data", data);

    if (CenterID) {
      axiosClient
        .put(url, data)
        .then((response) => {
          console.log(response.data);
          updateItem(formProps.editCenterPhoneeID, response.data);
          $("#editCenterPhoneModal").modal("hide");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  const updateItem = (id, newArr) => {
    let index = phoneNumbersList.findIndex((x) => x._id === id);
    let g = phoneNumbersList[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setPhoneNumbersList([
        ...phoneNumbersList.slice(0, index),
        g,
        ...phoneNumbersList.slice(index + 1),
      ]);
  };

  // delete phone number
  const deletePhoneNumber = async (id) => {
    let result = await QuestionAlert(
      "حذف شماره!",
      "آیا از حذف شماره مرکز مطمئن هستید"
    );
    setIsLoading(true);

    if (result) {
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
    if (Router.isReady) {
      CenterID = Router.query.id;
      getAllPhoneNumbers();
      if (!CenterID) return null;
    }
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
                      <h5 className="card-title font-16">
                        لیست شماره تلفن های مرکز
                      </h5>
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
                  <CenterPhoneNumbersList
                    data={phoneNumbersList}
                    deletePhoneNumber={deletePhoneNumber}
                    updatePhoneNumber={updatePhoneNumber}
                  />
                )}
              </div>
              <div id="tablepagination" className="dataTables_wrapper"></div>
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

export default Insurance;
