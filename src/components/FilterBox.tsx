import React, { useState, useEffect } from 'react';

function FilterBox() {
  return (
    // <div className="filter-box d-flex align-center container">
    //     <span className="m-3">Filter by:</span>
    //     <div className="m-2">
    //         <label className="mr-1" htmlhtmlFor="project-title">
    //             Title
    //         </label>
    //         <input
    //             className="m-1"
    //             type="text"
    //             name="project-title"
    //             id="project-title"
    //         />
    //     </div>
    //     <div className="m-2">
    //         <label htmlhtmlFor="program">Program</label>
    //         <select className="m-1" name="program" id="program">
    //             <option value=""></option>
    //         </select>
    //     </div>
    //     <div className="m-2">
    //         <label htmlhtmlFor="research-area">Research Area</label>
    //         <select className="m-1" name="research-area" id="research-area">
    //             <option value=""></option>
    //         </select>
    //     </div>
    // </div>

    <div className="filter-box d-flex align-center container">
      {/* <form className="form-inline">
                <div className="form-group mb-2">
                    <label htmlFor="staticEmail2" className="sr-only">
                        Email
                    </label>
                    <input
                        type="text"
                        readOnly
                        className="form-control-plaintext"
                        id="staticEmail2"
                    />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <label htmlFor="inputPassword2" className="sr-only">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword2"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">
                    Confirm identity
                </button>
            </form> */}
    </div>
  );
}

export default FilterBox;
