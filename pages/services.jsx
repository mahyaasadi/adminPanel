"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { updateItem } from "utils/updateItem";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ModalitiesHeader from "components/dashboard/services/modalitiesHeader/modalitiesHeader";
import ServicesListTable from "components/dashboard/services/servicesListTable";
import AddServiceModal from "components/dashboard/services/addServiceModal";
import EditServiceModal from "components/dashboard/services/editServiceModal";

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

let ActiveSrvModalityID,
  ActiveSrvModalityName,
  ActiveServiceID = null;

const Services = ({ UserData }) => {
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

    axiosClient
      .post(url, data)
      .then((response) => {
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

    await axiosClient
      .put(url, data)
      .then((response) => {
        updateItem(
          formProps.editSrvID,
          response.data,
          servicesData,
          setServicesData
        );
        $("#editServiceModal").modal("hide");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات سرویس با خطا مواجه گردید!");
      });
  };

  // delete service
  const deleteService = async (id) => {
    let result = await QuestionAlert(
      "",
      "آیا از حذف سرویس مطمئن هستید"
    );

    if (result) {
      let url = `ServicesInfo/delete/${id}`;
      let data = {
        Modality: ActiveSrvModalityID,
        ServiceID: id,
      };

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

  useEffect(() => getModalities(), []);

  return (
    <>
      <Head>
        <title>مدیریت سرویس ها</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <ModalitiesHeader
            data={modalityData}
            getDepServices={getDepServices}
          />
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
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

                {isLoading ? (
                  <Loading />
                ) : (
                  <ServicesListTable
                    data={servicesData}
                    deleteService={deleteService}
                    updateService={updateService}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

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
