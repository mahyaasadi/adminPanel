"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { QuestionAlert, ErrorAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ServicesListTable from "components/dashboard/services/servicesListTable/servicesListTable";
import ModalitiesHeader from "components/dashboard/services/modalitiesHeader/modalitiesHeader";
import AddServiceModal from "components/dashboard/services/addServiceModal/addServiceModal";

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modalityData, setModalityData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  // get all modalities
  const getModalities = () => {
    let url = "Modality/getAll";
    setIsLoading(true);

    axiosClient
      .get(url)
      .then((response) => {
        console.log(response.data);
        setIsLoading(false);
        setModalityData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // get all services by modality
  const getDepServices = (modalityId) => {
    console.log("modalityId", modalityId);

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
  };

  const addService = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "ServicesInfo/add";
    let addData = {
      //   CenterID: CenterID,
      //   DepID: activeDepId,
      ServiceID: formProps.addSrvId,
      Service: formProps.serviceName,
      //   CenterGroup: formProps.srvGroupName,
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

    console.log(addData);
    axiosClient
      .post(url, addData)
      .then((response) => {
        setServices([...services, response.data]);
        setIsLoading(false);
        console.log("added", response.data);
        $("#addServiceModal").modal("hide");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(true);
      });
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
                    // updateModality={updateModality}
                  />
                </div>

                <div id="tablepagination" className="dataTables_wrapper"></div>
              </div>
            </div>
          </div>
        )}

        <AddServiceModal />
      </div>
    </>
  );
};

export default Services;
