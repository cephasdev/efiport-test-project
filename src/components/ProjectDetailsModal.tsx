import { useContext } from 'react';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import { predefinedUsers } from './PredefinedUsers';

function ProjectDetailsModal() {
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
                                        {/* {appState.projectDetails.users.join()} */}
                                        {appState.projectDetails.users.map(
                                            (userId: string, idx) => {
                                                return (
                                                    <span
                                                        key={idx}
                                                        className="mx-1"
                                                    >
                                                        {
                                                            predefinedUsers[
                                                                parseInt(userId)
                                                            ]
                                                        }
                                                        {idx <
                                                            appState
                                                                .projectDetails
                                                                .users.length -
                                                                1 && (
                                                            <span>,</span>
                                                        )}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </span>
                                </div>
                            )}
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

export default ProjectDetailsModal;
