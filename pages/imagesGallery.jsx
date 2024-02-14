import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import FeatherIcon from "feather-icons-react";
import { axiosClient } from "class/axiosConfig.js";
import { convertBase64 } from "utils/convertBase64";
import { WarningAlert, QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ImagesListTable from "components/dashboard/imagesGallery/imagesListTable";
import UploadImageModal from "components/dashboard/imagesGallery/uploadImageModal";
import Paginator from "components/commonComponents/paginator";
import { ErrorAlert } from "class/AlertManage.js";

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
const ImagesGallery = ({ UserData }) => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [hiddenData, setHiddenData] = useState(null);
  const [imagesData, setImagesData] = useState([]);

  // Pagination => User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // Number of items to be displayed on each page
  const [itemsPerPage, setItemsPerPage] = useState(8);
  // The first and last record on the current page
  const indexOfLastRecord = currentPage * itemsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - itemsPerPage;
  // Records to be displayed on the current page
  const currentItems = imagesData.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(imagesData.length / itemsPerPage);

  //get Images
  const getImagesGallery = () => {
    CenterID = Router.query.id;
    let url = `CenterProfile/getCenterGallery/${CenterID}`;
    setIsLoading(true);

    if (CenterID) {
      axiosClient
        .get(url)
        .then(function (response) {
          setImagesData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Upload image
  let img = null;
  const uploadImage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    CenterID = Router.query.id;

    if (CenterID) {
      if (formProps.img && formProps.img.size != 0) {
        img = await convertBase64(formProps.img);
        let url = "CenterProfile/AddGallery";

        let data = {
          CenterID: CenterID,
          Img: img,
          Title: formProps.Title,
          Des: formProps.Des,
        };

        console.log(data);
        axiosClient
          .post(url, data)
          .then((response) => {
            setImagesData([...imagesData, response.data]);

            setIsLoading(false);
            $("#uploadImageModal").modal("hide");
            e.target.reset();
            $("#fileUploadPreview").attr("src", " ");
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
            ErrorAlert("خطا", "حجم تصویر باید حداکثر 5 مگابایت باشد");
          });
      }
    } else {
      WarningAlert("هشدار!", "تصویری انتخاب نشده است");
    }
  };

  // Delete Image
  const deleteImage = async (data) => {
    let result = await QuestionAlert(
      "حذف تصویر!",
      "آیا از حذف تصویر مطمئن هستید"
    );
    setIsLoading(true);

    if (result) {
      let url = "CenterProfile/DeleteGallery";
      CenterID = Router.query.id;

      let deleteData = {
        data: {
          CenterID: CenterID,
          GalleryID: data._id,
          Image: data.Image,
          Med: data.Med,
          Thumb: data.Thumb,
          WebpImage: data.WebpImage,
          WebpMed: data.WebpMed,
          WebpThumb: data.WebpThumb,
        },
      };

      if (CenterID) {
        await axiosClient
          .delete(url, deleteData)
          .then(function (response) {
            setImagesData(imagesData.filter((a) => a._id !== data._id));
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

      setHiddenData(JSON.parse(localStorage.getItem("hiddenData")));
      if (hiddenData) localStorage.removeItem("hiddenData");

      getImagesGallery();
    }
  }, [Router.isReady]);

  return (
    <>
      <Head>
        <title>گالری تصاویر</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-md-12 d-flex justify-content-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#uploadImageModal"
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
                        گالری تصاویر {""} {hiddenData?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <Loading />
                ) : (
                  <div>
                    <ImagesListTable
                      data={currentItems}
                      deleteImage={deleteImage}
                    />

                    {currentItems.length > 0 && (
                      <Paginator
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadImageModal uploadImage={uploadImage} />
    </>
  );
};

export default ImagesGallery;
