"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ServicesListTable from "components/dashboard/services/servicesListTable/servicesListTable";
import ModalitiesHeader from "components/dashboard/services/modalitiesHeader/modalitiesHeader";
import AddServiceModal from "components/dashboard/services/addServiceModal/addServiceModal";
import EditServiceModal from "components/dashboard/services/editServiceModal/editServiceModal";

let ActiveSrvModalityID,
  ActiveSrvModalityName,
  ActiveServiceID = null;

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalityData, setModalityData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [editServiceData, setEditServiceData] = useState([]);

  // get all modalities
  const getModalities = () => {
    let url = "Modality/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log("modalities", response.data);
        setIsLoading(false);
        setModalityData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // get all services by modality
  const getDepServices = (modalityId, modalityName) => {
    ActiveSrvModalityID = modalityId;
    ActiveSrvModalityName = modalityName;

    let url = `/ServicesInfo/getByModality/${modalityId}`;
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log("services", response.data);
        setServicesData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // add new service
  const openAddSrvModal = () => {
    $("#addServiceModal").modal("show");
    console.log(
      "ActiveSrvModality",
      ActiveSrvModalityName + ActiveSrvModalityID
    );
  };

  const addService = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "ServicesInfo/add";
    let data = {
      Modality: ActiveSrvModalityID,
      ServiceGroup: ActiveSrvModalityName,
      ServiceID: formProps.addSrvId,
      Service: formProps.addServiceName,
      CenterGroup: formProps.srvGroupName,
      Total_K: formProps.total_K,
      Technical_K: formProps.tech_K,
      Professional_K: formProps.pro_K,
      GovernmentalTariff: formProps.govTariff,
      PrivateTariff: formProps.privateTariff,
      FreeTariff: formProps.freeTariff,
      PatientCost: formProps.patientCost,
      ArteshPatientCost: formProps.arteshPatientCost,
      PrivateTechnicalK_Price: formProps.ptk_price,
      PrivateProfessionalK_Price: formProps.ppk_price,
      GovernmentalTechnicalK_Price: formProps.gtk_price,
      GovernmentalProfessionalK_Price: formProps.gpk_price,
      ST: formProps.taminShare,
      SS: formProps.salamatShare,
      SA: formProps.arteshShare,
    };

    console.log("data", data);

    axiosClient
      .post(url, data)
      .then((response) => {
        console.log("response", response.data);
        setServicesData([...servicesData, response.data]);

        $("#addServiceModal").modal("hide");
        e.target.reset();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "افزودن سرویس با خطا مواجه گردید!");
      });
  };

  // edit service
  const updateService = (data, serviceID) => {
    setEditServiceData(data);
    ActiveServiceID = serviceID;

    $("#editServiceModal").modal("show");
    console.log(
      "ActiveSrvModality",
      ActiveSrvModalityName + ActiveSrvModalityID
    );
  };

  const editService = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let serviceID = formProps.editSrvID;

    let url = `ServicesInfo/edit/${serviceID}`;
    let data = {
      Modality: ActiveSrvModalityID,
      ServiceGroup: ActiveSrvModalityName,
      ServiceID: formProps.editSrvID,
      Service: formProps.serviceName,
      CenterGroup: formProps.srvGroupName,
      Total_K: formProps.total_K,
      Technical_K: formProps.tech_K,
      Professional_K: formProps.pro_K,
      PrivateTechnicalK_Price: formProps.ptk_price,
      PrivateProfessionalK_Price: formProps.ppk_price,
      GovernmentalTechnicalK_Price: formProps.gtk_price,
      GovernmentalProfessionalK_Price: formProps.gpk_price,
      GovernmentalTariff: formProps.govTariff,
      PrivateTariff: formProps.privateTariff,
      FreeTariff: formProps.freeTariff,
      PatientCost: formProps.patientCost,
      ArteshPatientCost: formProps.arteshPatientCost,
      ST: formProps.taminShare,
      SS: formProps.salamatShare,
      SA: formProps.arteshShare,
    };

    console.log("data", data);

    await axiosClient
      .put(url, data)
      .then((response) => {
        console.log(response.data);
        updateItem(formProps.editSrvID, response.data);
        $("#editServiceModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات سرویس با خطا مواجه گردید!");
      });
  };

  const updateItem = (id, newArr) => {
    let index = servicesData.findIndex((x) => x._id === id);
    let g = servicesData[index];
    g = newArr;

    if (index === -1) {
      // handle error
      console.log("no match");
    } else
      setServicesData([
        ...servicesData.slice(0, index),
        g,
        ...servicesData.slice(index + 1),
      ]);
  };

  // delete service
  const deleteService = async (id) => {
    let result = await QuestionAlert(
      "حذف سرویس!",
      "آیا از حذف سرویس مطمئن هستید"
    );

    if (result) {
      let url = `ServicesInfo/delete/${id}`;
      let data = {
        Modality: ActiveSrvModalityID,
        ServiceID: id,
      };

      console.log("data", data);

      await axiosClient
        .delete(url, { data })
        .then(function () {
          setServicesData(servicesData.filter((a) => a._id !== id));
        })
        .catch(function (error) {
          console.log(error);
          ErrorAlert("خطا", "حذف سرویس با خطا مواجه گردید!");
        });
    }
  };

  useEffect(() => {
    getModalities();
  }, []);

  return (
    <>
      <Head>
        <title>مدیریت سرویس ها</title>
      </Head>
      <div className="page-wrapper">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container-fluid">
            <ModalitiesHeader
              data={modalityData}
              getDepServices={getDepServices}
            />

            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-md-12 d-flex justify-content-end mt-4">
                  <button
                    onClick={openAddSrvModal}
                    className="btn btn-primary btn-add"
                  >
                    <i className="me-1">
                      <FeatherIcon icon="plus-square" />
                    </i>{" "}
                    افزودن
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
                        <h5 className="card-title font-16">لیست سرویس ها</h5>
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

                  <ServicesListTable
                    data={servicesData}
                    deleteService={deleteService}
                    updateService={updateService}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <AddServiceModal addService={addService} isLoading={isLoading} />

        <EditServiceModal
          data={editServiceData}
          editService={editService}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Services;
