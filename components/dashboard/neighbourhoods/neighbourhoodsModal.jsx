import { useEffect } from "react";
import { Modal } from 'react-bootstrap';
import SelectField from "components/commonComponents/selectfield";
import selectfieldColourStyles from "class/selectfieldStyle";

const NeighbourhoodsModal = ({
    mode = "add", // Default is 'add'
    onSubmit,
    data = {},
    isLoading,
    show,
    onHide,
    provinceOptionsList,
    FUSelectProvince,
    FUSelectCity,
    setCityOption,
    cityOptionsList,
    setSelectedProvinceList
}) => {
    const modalTitle = mode === "edit" ? "ویرایش اطلاعات" : "افزودن محله"
    const submitText = mode === "edit" ? "ثبت تغییرات" : "ثبت";

    let selectedProvince, selectedCity = null;
    let selectCityData = [];

    if (data) {
        selectedProvince = {
            value: data?.ProvinceFin,
            label: data?.Province,
        };

        selectedCity = {
            value: data.CityFin,
            label: data.City,
        };
    }

    for (let i = 0; i < cityOptionsList.length; i++) {
        const item = cityOptionsList[i];
        let cityObj = {
            value: item.Info[0].Finglish,
            label: item.CityName,
        };
        selectCityData.push(cityObj);
    }

    useEffect(() => {
        setSelectedProvinceList(selectedProvince);
        let findCities = provinceOptionsList.find(
            (x) => x.value === data.ProvinceFin
        );
        if (findCities) setCityOption(findCities.cities);
    }, [data]);

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
                            name="stateID"
                            value={data._id}
                        />
                    )}

                    <div className="form-group">
                        <label className="lblAbs font-12">
                            نام محله <span className="text-danger">*</span>
                        </label>
                        <div className="col p-0">
                            <input
                                type="text"
                                className="form-control floating inputPadding rounded"
                                name={mode == "edit" ? "editStateName" : "addStateName"}
                                defaultValue={mode == "edit" ? data.State : ""}
                                key={data.State}
                                required
                            />
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label className="lblAbs font-12">
                                نام انگلیسی محله <span className="text-danger">*</span>
                            </label>
                            <div className="col p-0">
                                <input
                                    dir="ltr"
                                    type="text"
                                    className="form-control floating inputPadding rounded"
                                    defaultValue={mode == "edit" ? data.Finglish : ""}
                                    name={mode == "edit" ? "editStateEngName" : "addStateEngName"}
                                    key={data.Finglish}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col media-w-100">
                            <label className="lblDrugIns font-12">
                                استان <span className="text-danger">*</span>
                            </label>
                            <SelectField
                                className="text-center font-12"
                                placeholder={"انتخاب نمایید"}
                                styles={selectfieldColourStyles}
                                options={provinceOptionsList}
                                onChange={(value) => setCityOption(value.cities)}
                                onChangeValue={(value) => FUSelectProvince(value?.value)}
                                id={mode == "edit" ? "editSelectStateProvince" : "selectStateProvince"}
                                defaultValue={mode == "edit" ? selectedProvince : ""}
                                name={mode == "edit" ? "editStateProvince" : "addStateProvince"}
                                key={data.Province}
                                required
                            />
                        </div>

                        <div className="col media-w-100">
                            <label className="lblDrugIns font-12">
                                شهر <span className="text-danger">*</span>
                            </label>
                            <SelectField
                                className="text-center font-12 editCitySelectOptions"
                                placeholder={"انتخاب نمایید"}
                                styles={selectfieldColourStyles}
                                options={selectCityData}
                                onChangeValue={(value) => FUSelectCity(value?.value)}
                                id={mode == "edit" ? "editStateCitySelect" : "stateCitySelect"}
                                defaultValue={mode == "edit" ? selectedCity : ""}
                                name={mode == "edit" ? "editStateCity" : "addStateCity"}
                                key={data.City}
                                required
                            />
                        </div>
                    </div>

                    <div className="submit-section">
                        {!isLoading ? (
                            <button
                                type="submit"
                                className="btn btn-primary rounded btn-save font-13"
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

export default NeighbourhoodsModal;