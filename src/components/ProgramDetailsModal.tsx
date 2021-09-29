import React, { useState, useEffect, useContext } from 'react';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

function ProgramDetailsModal() {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    if (!appState.projectDetailsModalOpen) {
        return null;
    }

    return (
        <div className="modal fade d-block show" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Program Details</h5>
                    </div>
                    <div className="modal-body">
                        {/* <p>Modal body text goes here.</p> */}
                        <div className="program-details-listing">
                            <div className="detail-fragment">
                                <label htmlFor="title">Title:</label>
                                <span className="px-3" id="title">
                                    {appState.projectDetails.title}
                                </span>
                            </div>
                            <div className="detail-fragment">
                                <label htmlFor="program">Program:</label>
                                <span className="px-3" id="program">
                                    {/* {appState.projectDetails.program} */}
                                    {
                                        appState.projectDetails
                                            .projectProgram[0].title
                                    }
                                </span>
                            </div>
                            <div className="detail-fragment">
                                <label htmlFor="research-area">
                                    Research Area:
                                </label>
                                <span className="px-3" id="research-area">
                                    {/* {appState.projectDetails.research_area} */}
                                    {
                                        appState.projectDetails
                                            .projectResearchArea[0].title
                                    }
                                </span>
                            </div>
                            <div className="detail-fragment">
                                <label htmlFor="research-area">
                                    Is Group Project:
                                </label>
                                <span className="px-3" id="research-area">
                                    {appState.projectDetails.isgroupproject
                                        ? '✔'
                                        : '❌'}
                                </span>
                            </div>
                            {appState.projectDetails.isgroupproject && (
                                <div className="detail-fragment">
                                    <label htmlFor="research-area">
                                        Users on Project:
                                    </label>
                                    <span className="px-3" id="research-area">
                                        {appState.projectDetails.users.join()}
                                    </span>
                                </div>
                            )}

                            {/* <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Program</th>
                                        <th scope="col">Group Project?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{appState.projectDetails.title}</td>
                                        <td>
                                            {appState.projectDetails.program}
                                        </td>
                                        <td>
                                            {
                                                appState.projectDetails
                                                    .research_area
                                            }
                                        </td>
                                        <td>
                                            {appState.projectDetails
                                                .isgroupproject
                                                ? '✔'
                                                : '❌'}
                                        </td>
                                        {appState.projectDetails
                                            .isgroupproject && (
                                            <td>
                                                {appState.projectDetails.users.join()}
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            onClick={() =>
                                appDispatch({
                                    type: 'closeProjectDetailsModal'
                                })
                            }
                            className="btn btn-primary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgramDetailsModal;
