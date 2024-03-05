import { useState, useEffect } from "react";
import JDate from "jalali-date";
import { axiosClient } from "class/axiosConfig";
import { Tooltip } from "primereact/tooltip";
import { Dropdown } from "primereact/dropdown";
import { dateShortcutsData } from "class/staticDropdownOptions";
import { handleDateOptionsSelect } from "utils/defaultDateRanges";
import DatePicker from "components/commonComponents/datepicker/DatePicker";

const jdate = new JDate();
const FilterCentersReports = ({ getFilteredCenters }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [DateFrom, setDateFrom] = useState(null);
  const [DateTo, setDateTo] = useState(null);
  const [selectedDateOption, setSelectedDateOption] = useState(null);

  const handleSelect = (option) => {
    handleDateOptionsSelect(
      option,
      setSelectedDateOption,
      setDateTo,
      setDateFrom
    );
  };

  const changeDateFrom = (dateFrom) => {
    const dateFromValue =
      dateFrom?.year.toString() +
      "/" +
      dateFrom?.month.toString() +
      "/" +
      dateFrom?.day.toString();
    setDateFrom(dateFromValue);
  };

  const changeDateTo = (dateTo) => {
    const dateToValue =
      dateTo?.year.toString() +
      "/" +
      dateTo?.month.toString() +
      "/" +
      dateTo?.day.toString();
    setDateTo(dateToValue);
  };

  const applyFilterOnReports = (e, reset, defDate) => {
    e && e.preventDefault();
    setIsLoading(true);

    let url = "Dashboard/CenterCountAppointment";
    let data = {
      DateFrom: DateTo,
      DateTo: DateFrom,
    };

    if (reset === 1) {
      data = {
        DateFrom: "",
        DateTo: "",
      };
    }

    if (defDate) {
      data = {
        DateFrom: jdate.format("YYYY/MM/DD"),
        DateTo: jdate.format("YYYY/MM/DD"),
      };
    }

    axiosClient
      .post(url, data)
      .then((response) => {
        const itemsArray = Object.entries(response.data).map(
          ([name, count]) => ({ name, count })
        );

        itemsArray.sort((a, b) => b.count - a.count);
        getFilteredCenters(itemsArray);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => applyFilterOnReports(null, 0, true), []);

  return (
    <div className="card shadow filterReceptionCard p-relative">
      <label className="lblAbs fw-bold font-13">فیلتر گزارشات</label>
      <form onSubmit={(e) => applyFilterOnReports(e, 0, false)}>
        <div className="card-body row align-items-center mt-3 searchContainerPadding receptionSearch-header">
          <div className="col-12 col-lg-3 mb-3">
            <DatePicker setDate={changeDateTo} label="از تاریخ" />
          </div>

          <div className="col-12 col-lg-3 mb-3">
            <DatePicker setDate={changeDateFrom} label="تا تاریخ" />
          </div>

          <div className="col-12 col-lg-2 mb-3">
            <label className="lblAbs font-12">بازه های پیش فرض</label>
            <Dropdown
              options={dateShortcutsData}
              value={selectedDateOption}
              onChange={(e) => handleSelect(e.value)}
              optionLabel="label"
              placeholder="انتخاب نمایید"
              showClear
            />
          </div>

          {!isLoading ? (
            <div className="col-12 col-lg-2 mb-3">
              <button className="btn btn-primary d-flex justify-center align-items-center w-100 height-40">
                <i className="fe fe-search"></i>
              </button>
            </div>
          ) : (
            <div className="col-12 col-lg-2 mb-3">
              <button
                type="submit"
                className="btn btn-primary d-flex align-items-center justify-center w-100 height-40"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></span>
              </button>
            </div>
          )}

          <div className="col-12 col-lg-2 mb-3">
            <button
              onClick={(e) => applyFilterOnReports(e, 1, false)}
              data-pr-position="top"
              className="btn btn-primary d-flex align-items-center justify-center refreshBtn w-100 height-40"
            >
              <i className="fa fa-refresh"></i>
              <Tooltip target=".refreshBtn">تنظیم مجدد</Tooltip>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterCentersReports;
