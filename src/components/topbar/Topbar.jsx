import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  Login,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">TITO'S CORNER ADMIN PANEL</span>
        </div>
        <div className="topRight">
          <Link to="/login">
            <div className="topbarIconContainer">
              <Login title="Login here" />
            </div>
          </Link>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="logo.png"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
