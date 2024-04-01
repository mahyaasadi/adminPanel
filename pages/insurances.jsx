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
import InsuranceListTable from "components/dashboard/insurances/insuranceListTable";
import AddInsuranceModal from "components/dashboard/insurances/addInsuranceModal";
import EditInsuranceModal from "components/dashboard/insurances/editInsuranceModal";
import { insuranceTypeDataClass, insuranceStatusDataClass } from "class/staticDropdownOptions";

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
const Insurance = ({ UserData }) => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [insuranceList, setInsuranceList] = useState([]);
  const [editedInsurance, setEditedInsurance] = useState([]);
  const [hiddenData, setHiddenData] = useState(null);

  let SelectInsuranceType,
    SelectInsuranceStatus = "";
  const FUSelectInsuranceType = (Type) => SelectInsuranceType = Type;
  const FUSelectInsuranceStatus = (Status) => SelectInsuranceStatus = Status;

  // Get Insurance List
  const getInsuranceData = () => {
    CenterID = Router.query.id;
    let url = `CenterProfile/getCenterInsurance/${CenterID}`;
    setIsLoading(true);

    if (CenterID) {
      axiosClient
        .get(url)
        .then(function (response) {
          setInsuranceList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  // Add Insurance
  const addInsurance = (e) => {
    e.preventDefault();
    setIsLoading(true);

    CenterID = Router.query.id;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "CenterProfile/AddInsurance";
    let data = {
      CenterID: CenterID,
      Name: formProps.addInsuranceName,
      Type: SelectInsuranceType,
      Status: SelectInsuranceStatus,
    };

    if (CenterID) {
      axiosClient
        .post(url, data)
        .then((response) => {
          setInsuranceList([...insuranceList, response.data]);

          setIsLoading(false);
          $("#addInsuranceModal").modal("hide");
          e.target.reset();
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Edit Insurance
  const editInsurance = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let url = "CenterProfile/UpdateInsurance";
    CenterID = Router.query.id;
    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let Data = {
      CenterID: CenterID,
      InsuranceID: formProps.EditInsuranceID,
      Name: formProps.EditInsuranceName,
      Type: formProps.EditInsuranceType,
      Status: formProps.EditInsuranceStatus,
    };

    if (CenterID) {
      axiosClient
        .put(url, Data)
        .then((response) => {
          updateItem(
            formProps.EditInsuranceID,
            response.data,
            insuranceList,
            setInsuranceList
          );
          $("#editInsuranceModal").modal("hide");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
        });
    }
  };

  const updateInsurance = (data) => {
    setEditedInsurance(data);
    $("#editInsuranceModal").modal("show");
  };

  // Delete Insurance
  const deleteInsurance = async (id) => {
    let result = await QuestionAlert("حذف بیمه!", "آیا از حذف مطمئن هستید");
    setIsLoading(true);

    if (result) {
      let url = "CenterProfile/DeleteInsurance";
      CenterID = Router.query.id;
      let data = {
        CenterID: CenterID,
        InsuranceID: id,
      };

      if (CenterID) {
        await axiosClient
          .delete(url, { data })
          .then(function () {
            setInsuranceList(insuranceList.filter((a) => a._id !== id));
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
      getInsuranceData();
      setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));

      if (hiddenData) localStorage.removeItem("hiddenData");
    }
  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>بیمه های تحت پوشش</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#addInsuranceModal"
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

          {/* <!-- Insurance List --> */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header border-bottom-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <p className="card-title font-14 text-secondary">
                        لیست بیمه های تحت پوشش {""} {hiddenData?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <InsuranceListTable
                    data={insuranceList}
                    deleteInsurance={deleteInsurance}
                    updateInsurance={updateInsurance}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddInsuranceModal
        data={insuranceList}
        addInsurance={addInsurance}
        insuranceType={insuranceTypeDataClass}
        insuranceStatus={insuranceStatusDataClass}
        FUSelectInsuranceType={FUSelectInsuranceType}
        FUSelectInsuranceStatus={FUSelectInsuranceStatus}
      />

      <EditInsuranceModal
        editInsurance={editInsurance}
        data={editedInsurance}
        insuranceType={insuranceTypeDataClass}
        insuranceStatus={insuranceStatusDataClass}
        FUSelectInsuranceType={FUSelectInsuranceType}
        FUSelectInsuranceStatus={FUSelectInsuranceStatus}
      />
    </>
  );
};

export default Insurance;
