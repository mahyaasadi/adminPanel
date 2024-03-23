import { Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

const ClinicUserModal = ({
  mode = "add", // Default is 'add'
  onSubmit,
  data = {},
  isLoading,
  show,
  onHide,
  eye,
  onEyeClick,
  password,
  handlePassword,
  showValidationText1,
  showValidationText2,
  showValidationText3,
  setShowValidationText1,
  setShowValidationText2,
  setShowValidationText3,
}) => {
  const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "افزودن کاربر";
  const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";

  const validatePassword = (e) => {
    e.preventDefault();

    if (password.length < 7) {
      setShowValidationText1(true);
      $("#submitUserBtn").attr("disabled", true);
    } else {
      setShowValidationText1(false);
      $("#submitUserBtn").attr("disabled", false);
    }
  };

  const validateConfPassword = (e) => {
    e.preventDefault();

    let passValue = $("#clinicUserPassword").val();
    let confpassValue = $("#confirmClinicUserPassword").val();

    if (passValue !== confpassValue) {
      setShowValidationText2(true);
      $("#submitUserBtn").attr("disabled", true);
    } else {
      setShowValidationText2(false);
      $("#submitUserBtn").attr("disabled", false);
    }
  };

  // const NationalIdValidate = (e) => {
  //   e.preventDefault();

  //   let userNID = $("#userNID").val();

  //   if (userNID.length < 10) {
  //     setShowValidationText4(true);
  //     $("#submitUserBtn").attr("disabled", true);
  //   } else {
  //     setShowValidationText4(false);
  //     $("#submitUserBtn").attr("disabled", false);
  //   }
  // };

  const telNumberValidate = (e) => {
    e.preventDefault();

    let userTel = $("#clinicUserTel").val();

    if (userTel.length !== 11) {
      setShowValidationText3(true);
      $("#submitUserBtn").attr("disabled", true);
    } else {
      setShowValidationText3(false);
      $("#submitUserBtn").attr("disabled", false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <p className="mb-0 text-secondary font-14 fw-bold">{modalTitle}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          {mode === "edit" && (
            <input
              type="hidden"
              className="form-control floating"
              name="clinicUserID"
              value={data._id}
            />
          )}

          <div className="form-group">
            <label className="lblAbs font-12">
              نام و نام خانوادگی <span className="text-danger">*</span>
            </label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                name="clinicUserFullName"
                defaultValue={mode === "edit" ? data.FullName : ""}
                key={data.FullName}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="lblAbs font-12">نام کاربری</label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                name="cliniceUserUserName"
                defaultValue={mode === "edit" ? data.User : ""}
                key={data.User}
                readOnly={mode === "edit"}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">نام مستعار</label>
            <div className="col p-0">
              <input
                className="form-control floating inputPadding rounded"
                type="text"
                name="cliniceUserNickName"
                defaultValue={mode === "edit" ? data.NickName : ""}
                key={data.NickName}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="lblAbs font-12">
              کد ملی <span className="text-danger">*</span>
            </label>
            <div className="col p-0">
              <input
                type="text"
                dir="ltr"
                name="clinicUserNID"
                id="clinicUserNID"
                className="form-control floating inputPadding rounded"
                required
                defaultValue={mode == "edit" ? data.NID : ""}
                key={data.NID}
              // onBlur={NationalIdValidate}
              />
            </div>
          </div>

          {mode == "add" && (
            <div>
              <div className="input-group marginb-med">
                <label className="lblAbs font-12">
                  رمز عبور <span className="text-danger">*</span>
                </label>
                <input
                  type={eye ? "password" : "text"}
                  name="clinicUserPassword"
                  id="clinicUserPassword"
                  required
                  autoComplete="true"
                  value={password}
                  onChange={handlePassword}
                  className="form-control inputPadding rounded"
                //   onBlur={validatePassword}
                />
                <span
                  onClick={onEyeClick}
                  className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"
                    }`}
                />
              </div>

              {/* password validation */}
              {showValidationText1 && (
                <div className="marginb-med">
                  <div
                    className="text-secondary font-13 frmValidation form-control inputPadding rounded mb-1"
                    id="formValidationText1"
                  >
                    <FeatherIcon
                      icon="alert-triangle"
                      className="frmValidationTxt"
                    />
                    <div className="frmValidationTxt">
                      رمز عبور باید حداقل 7 رقم باشد!
                    </div>
                  </div>
                </div>
              )}

              <div className="input-group marginb-med">
                <label className="lblAbs font-12">
                  تکرار رمز عبور <span className="text-danger">*</span>
                </label>
                <input
                  type={eye ? "password" : "text"}
                  name="confirmClinicUserPassword"
                  id="confirmClinicUserPassword"
                  required
                  autoComplete="true"
                  className="form-control inputPadding rounded"
                  onBlur={validateConfPassword}
                />
                <span
                  onClick={onEyeClick}
                  className={`fa toggle-password" ${eye ? "fa-eye-slash" : "fa-eye"
                    }`}
                />
              </div>

              {/* confirmPassword Validation */}
              {showValidationText2 && (
                <div className="marginb-med">
                  <div
                    className="text-secondary font-13 frmValidation form-control inputPadding rounded mb-1"
                    id="formValidationText2"
                  >
                    <FeatherIcon
                      icon="alert-triangle"
                      className="frmValidationTxt"
                    />
                    <div className="frmValidationTxt">
                      رمز عبور تطابق ندارد!
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label className="lblAbs font-12">شماره همراه</label>
            <div className="col p-0">
              <input
                name="clinicUserTel"
                id="clinicUserTel"
                dir="ltr"
                className="form-control floating inputPadding rounded"
                defaultValue={mode == "edit" ? data.Tel : ""}
                key={data.Tel}
                onBlur={telNumberValidate}
              />
            </div>
          </div>

          {/* userTel validation */}
          {showValidationText3 && (
            <div className="marginb-med">
              <div
                className="text-secondary font-13 frmValidation form-control inputPadding rounded mb-1"
                id="formValidationText3"
              >
                <FeatherIcon
                  icon="alert-triangle"
                  className="frmValidationTxt"
                />
                <div className="frmValidationTxt">
                  شماره همراه باید دارای 11 رقم باشد!
                </div>
              </div>
            </div>
          )}

          <div className="submit-section">
            {!isLoading ? (
              <button
                type="submit"
                className="btn btn-primary rounded btn-save font-13"
                id="submitUserBtn"
              >
                {submitText}
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary rounded font-13"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                در حال ثبت
              </button>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ClinicUserModal;
