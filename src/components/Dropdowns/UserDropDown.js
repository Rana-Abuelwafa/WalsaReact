import React from "react";
import { Link } from "react-router-dom"; 
import { Dropdown } from "react-bootstrap"; 
import { FiUser } from "react-icons/fi"; 
import { useTranslation } from "react-multi-lang"; 

function UserDropDown(props) {
  const t = useTranslation(); // Access the translation function

  return (
    // Bootstrap Dropdown component, closes automatically when an item is clicked
    <Dropdown className="d-inline userDropDown" autoClose="inside">
      
      {/* Dropdown toggle button displaying user name and user icon */}
      <Dropdown.Toggle id="user-dropdown" className="userDropDownBtn">
        {props.MyName} <FiUser className="icon" />
      </Dropdown.Toggle>

      {/* Dropdown menu items */}
      <Dropdown.Menu>
        {/* Link to profile if user is logged in, otherwise to login page */}
        <Dropdown.Item as={Link} to={props.MyName ? "/profile" : "/login"}>
          {t("Navbar.MyProfile")}
        </Dropdown.Item>

        {/* Link to user's registered questions page */}
        <Dropdown.Item as={Link} to="/RegisterQues">
          {t("Navbar.MyQuestions")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropDown;
