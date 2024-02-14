import { useEffect, useState } from "react";
import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { getSession } from "lib/session";
import { setSession } from "lib/SessionMange";
import { axiosClient } from "class/axiosConfig";
import { convertBase64 } from "utils/convertBase64";
import { SuccessAlert, ErrorAlert } from "class/AlertManage";
import PasswordSettings from "components/userProfile/passwordSettings";
import AvatarSettings from "components/userProfile/avatarSettings";
import GenralUserInfoSettings from "components/userProfile/generalUserInfoSettings";

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

const ProfileSettings = ({ UserData }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [userInfo, setUserInfo] = useState(UserData);

  const handleNewPassword = (e) => setNewPassword(e.target.value);

  const editGeneralUserInfo = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "InoAdmin/updateUser";
    let data = {
      UserID: formProps.userId,
      FullName: formProps.editUserFullName,
      Tel: formProps.editUserTel,
      User: formProps.editUserName,
    };

    axiosClient
      .put(url, data)
      .then(async (response) => {
        setUserInfo({
          FullName: response.data.FullName,
          Tel: response.data.Tel,
          User: formProps.editUserName,
        });

        // reset cookies
        let mngSession = await setSession(UserData);
        Cookies.set("mngSession", mngSession, { expires: 1 });

        SuccessAlert("موفق", "ویرایش اطلاعات با موفقیت انجام گرفت!");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        ErrorAlert("خطا", "ویرایش اطلاعات با خطا مواجه گردید!");
      });
  };

  const editUserPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let url = "InoAdmin/ChangePassword";
    let data = {
      UserID: formProps.userId,
      Password: formProps.currentPassword,
      NewPassword: newPassword,
    };

    axiosClient
      .put(url, data)
      .then((response) => {
        setIsLoading(false);
        SuccessAlert("موفق", "رمز عبور با موفقیت تغییر پیدا کرد!");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        ErrorAlert("خطا", "تغییر رمز عبور با خطا مواجه گردید!");
      });
  };

  const changeUserAvatar = async (formData) => {
    setIsLoading(true);

    const formProps = Object.fromEntries(formData);
    if (formProps.editUserAvatar) {
      let avatarBlob;

      if (formProps.editUserAvatar) {
        avatarBlob = await convertBase64(formProps.editUserAvatar);

        let url = "InoAdmin/ChangeAvatar";
        let data = {
          UserID: formProps.userId,
          Avatar: avatarBlob,
        };

        axiosClient
          .put(url, data)
          .then(async (response) => {
            document
              .getElementById("avatar")
              .setAttribute(
                "src",
                "https://irannobat.ir" + response.data.Avatar
              );
            document
              .getElementById("avatar")
              .setAttribute(
                "srcSet",
                "https://irannobat.ir" + response.data.Avatar
              );
            document
              .getElementById("dropdownAvatar")
              .setAttribute(
                "src",
                "https://irannobat.ir" + response.data.Avatar
              );
            document
              .getElementById("dropdownAvatar")
              .setAttribute(
                "srcSet",
                "https://irannobat.ir" + response.data.Avatar
              );

            UserData.Avatar = "https://irannobat.ir" + response.data.Avatar;

            // reset cookies
            let mngSession = await setSession(UserData);
            Cookies.set("mngSession", mngSession, { expires: 1 });

            setTimeout(() => {
              router.push("/profile");
            }, 300);
            SuccessAlert("موفق", "تغییر آواتار با موفقیت انجام گردید!");
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            ErrorAlert("خطا", "تغییر آواتار با خطا مواجه گردید!");
          });
      }
    }
  };

  useEffect(() => {
    $("#newPassValidationText1").hide();
    $("#newPassValidationText2").hide();
  }, []);

  return (
    <>
      <Head>
        <title>تنظیمات پروفایل</title>
      </Head>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="card">
            <div className="card-body padding-2">
              <div className="page-header">
                <div className="row">
                  <div className="col-sm-6">
                    <p className="font-17 fw-bold text-secondary">
                      تنظیمات پروفایل
                    </p>
                    <hr className="marginb-md1" />
                  </div>
                </div>
              </div>

              <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#solid-rounded-tab1"
                    data-bs-toggle="tab"
                  >
                    اطلاعات حساب
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#solid-rounded-tab2"
                    data-bs-toggle="tab"
                  >
                    رمز عبور
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane show active" id="solid-rounded-tab1">
                  <div className="row">
                    <GenralUserInfoSettings
                      userInfo={userInfo}
                      editGeneralUserInfo={editGeneralUserInfo}
                      isLoading={isLoading}
                    />
                    <AvatarSettings
                      UserData={userInfo}
                      changeUserAvatar={changeUserAvatar}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
                <div className="tab-pane" id="solid-rounded-tab2">
                  <PasswordSettings
                    newPassword={newPassword}
                    handleNewPassword={handleNewPassword}
                    editUserPassword={editUserPassword}
                    UserData={userInfo}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;

