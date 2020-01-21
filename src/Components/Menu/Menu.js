import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppContext from '../../AppContext';
import './Menu.css'

export default function Menu(props) {
  const context = useContext(AppContext)
  return (
    <div className="Menu">
        <div className="Menu--pal">
            <NavLink to="/forum">
              <div className="Menu--pal--btn">
                {/* <img src="./assets/pentagram-icon.svg" alt="pentagram icon"/> */}
              </div>
            </NavLink>
            <NavLink to={`/dashboard/${context.user.id}`}>
              <div className="Menu--pal--btn">
                {/* <div
                  className="Avatar-small"
                  style="
                    background: url(./assets/avatar-a.jpg) no-repeat center center;
                      background-size: cover;
                      -webkit-background-size: cover;
                      -moz-background-size: cover;
                      -o-background-size: cover;
                    ">
                </div> */}
              </div>
            </NavLink>
            <a href="./index-create-fest.html">
              <div className="Menu--pal--btn">
                <span><i className="fa fa-file"></i><br />+FLIER</span>
              </div>
            </a>

          </div>
    </div>
  )
}
