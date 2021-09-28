import React, { useState, useEffect, useContext } from 'react';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import { Link } from 'react-router-dom';

function Header() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  if (appState.isEditMode) {
    return (
      <div className="app-header p-3 d-flex bg-light border-bottom sticky-top">
        <div className="d-flex flex-grow-1">
          <Link
            to="/"
            onClick={() => appDispatch({ type: 'cancelEdit' })}
            className="btn btn-outline-primary btn-large m-1"
          >
            Back to All Programs
          </Link>
        </div>
        <div className="d-flex flex-grow-1 justify-content-end">
          <button
            onClick={() =>
              appDispatch({
                type: 'saveProject',
                value: {
                  title: 'New Project',
                  program: '7898989899',
                  research_area: 'asdasdasd',
                  literature: [],
                  isgroupproject: false,
                  users: []
                }
              })
            }
            className="btn btn-primary btn-large m-1"
          >
            Save
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="app-header p-3 d-flex bg-light border-bottom sticky-top">
        <div className="d-flex flex-grow-1 justify-content-end">
          <Link
            to="/edit"
            onClick={() => appDispatch({ type: 'openEdit' })}
            className="btn btn-primary btn-large m-1"
          >
            Add New Program
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
