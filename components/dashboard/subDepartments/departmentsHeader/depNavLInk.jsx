const DepNavLink = ({ data, activeClass, handleDepartmentClick }) => {
  return (
    <>
      <li className="nav-item">
        <a
          className={"nav-link ServiceNav " + activeClass}
          data-bs-toggle="tab"
          onClick={() => handleDepartmentClick(data._id)}
        >
          {data.PerFullName}
        </a>
      </li>
    </>
  );
};

export default DepNavLink;