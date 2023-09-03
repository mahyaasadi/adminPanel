import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { axiosClient } from "class/axiosConfig.js";
// import Cookies from "js-cookie";
import { useRouter } from "next/router";
import FeatherIcon from "feather-icons-react";
import { WarningAlert, QuestionAlert } from "class/AlertManage.js";
import Loading from "components/commonComponents/loading/loading";
import ImagesListTable from "components/dashboard/imagesGallery/imagesListTable";
import UploadImageModal from "components/dashboard/imagesGallery/uploadImageModal";
import { ErrorAlert } from "class/AlertManage.js";

let CenterID = null;

const ImagesGallery = () => {
  const Router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [imagesData, setImagesData] = useState([]);

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
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  };

  // Convert imageUrl to Base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      // console.log(file);

      fileReader.onload = () => {
        // console.log(fileReader.result);
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        // console.log(error);
        reject(error);
      };
    });
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

  // Delete Message
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
      console.log(CenterID);
      getImagesGallery();
      if (!CenterID) return null;
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
                      <h5 className="card-title font-16">گالری تصاویر</h5>
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
                  <ImagesListTable
                    data={imagesData}
                    deleteImage={deleteImage}
                  />
                )}
              </div>
              <div id="tablepagination" className="dataTables_wrapper"></div>
            </div>
          </div>
        </div>
      </div>

      <UploadImageModal uploadImage={uploadImage} />
    </>
  );
};
export default ImagesGallery;
