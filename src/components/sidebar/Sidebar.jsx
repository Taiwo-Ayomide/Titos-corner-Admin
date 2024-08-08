import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  Mic,
  PermIdentity,
  AttachMoney,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Book,
  Restaurant
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            {/* <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/newuser" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                New User
              </li>
            </Link>
            <Link to="/books" className="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon" />
                Books
              </li>
            </Link>
            <Link to="/newbook" className="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon" />
                New Book
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Mic  className="sidebarIcon" />
                Podcasts
              </li>
            </Link>
            <Link to="/newproduct" className="link">
              <li className="sidebarListItem">
                <Mic className="sidebarIcon" />
                New Podcast
              </li>
            </Link>
            <Link to="/blogs" className="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon" />
                Blogs
              </li>
            </Link>
            <Link to="/newblogs" className="link">
              <li className="sidebarListItem">
                <Book className="sidebarIcon" />
                New Blogs
              </li>
            </Link>
            <Link to="/recipes" className="link">
              <li className="sidebarListItem">
                <Restaurant className="sidebarIcon" />
                Recipes
              </li>
            </Link>
            <Link to="/newrecipes" className="link">
              <li className="sidebarListItem">
                <Restaurant className="sidebarIcon" />
                New Recipe
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>
            <Link to="/payment">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Payment
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
