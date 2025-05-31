import React from "react";
import { Link } from "react-router-dom";
import "../styles/swanik.css";

function ProfilePage() {
  return (
    <main className="profilecss">
      <div className="pf-section">
        <div className="pf-name">
          <div className="pprofile">
            <div className="bx bxs-user" id="pfp-icon"></div>
          </div>
          <h1 className="h1pfp">Khushi</h1>
        </div>

        <div className="update-info">
          <div className="full">
            <div className="pinfo">
              <div className="bx bxs-edit-alt" id="ui-image"></div>
              <p className="ppfp">
                <Link to="" className="linkpfp">Update Info</Link>
              </p>
            </div>
            <Link to="" className="linkpfp">
              <div className="bx bx-chevron-right" id="arrow-image"></div>
            </Link>
          </div>
          <div className="lining"></div>
        </div>

        <div className="saved">
          <div className="full">
            <div className="pinfo">
              <div className="bx bx-bookmark" id="s-image"></div>
              <p className="ppfp">
                <Link to="" className="linkpfp">Saved</Link>
              </p>
            </div>
            <Link to="" className="linkpfp">
              <div className="bx bx-chevron-right" id="arrow-image"></div>
            </Link>
          </div>
          <div className="lining"></div>
        </div>

        <div className="reports-made">
          <div className="full">
            <div className="pinfo">
              <div className="bx bx-clipboard" id="rm-image"></div>
              <p className="ppfp">
                <Link to="" className="linkpfp">Reports Made</Link>
              </p>
            </div>
            <Link to="" className="linkpfp">
              <div className="bx bx-chevron-right" id="arrow-image"></div>
            </Link>
          </div>
          <div className="lining"></div>
        </div>

        <div className="dogs-adopted">
          <div className="full">
            <div className="pinfo">
              <div className="bx bxs-dog" id="da-image"></div>
              <p className="ppfp">
                <Link to="" className="linkpfp">Dogs Adopted</Link>
              </p>
            </div>
            <Link to="" className="linkpfp">
              <div className="bx bx-chevron-right" id="arrow-image"></div>
            </Link>
          </div>
          <div className="lining"></div>
        </div>

        <div className="drafts">
          <div className="full">
            <div className="pinfo">
              <div className="bx bx-note" id="d-image"></div>
              <p className="ppfp">
                <Link to="" className="linkpfp">Drafts</Link>
              </p>
            </div>
            <Link to="" className="linkpfp">
              <div className="bx bx-chevron-right" id="arrow-image"></div>
            </Link>
          </div>
          <div className="lining"></div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
