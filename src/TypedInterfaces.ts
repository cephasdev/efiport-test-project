export interface IProgram {
    _id: string;
    title: string;
}

export interface IResearchArea {
    _id: string;
    title: string;
}

export interface IProject {
    _id: string;
    title: string;
    program: string;
    research_area: string;
    literature: string[];
    isgroupproject: boolean;
    users: string[];
    projectProgram: IProgram[];
    projectResearchArea: IResearchArea[];
}

export interface IProjectProps {
    projects: {
        _id: string;
        title: string;
        program: string;
        research_area: string;
        literature: string[];
        isgroupproject: boolean;
        users: string[];
        projectProgram: IProgram[];
        projectResearchArea: IResearchArea[];
    };
}

export interface IProjectFilter {
    program: string;
    researchArea: string;
    isGroupProject: string;
}

export interface IStateContextProps {
    programs: IProgram[];
    researchAreas: IResearchArea[];
    projectsList: IProject[];
    projectListIsLoading: boolean;
    isEditMode: boolean;
    projectDetailsModalOpen: boolean;
    projectDetails: IProject;
    savingNewProjectIsExecuting: boolean;
    projectFilters: IProjectFilter;
}

export interface IDispatchContextProps {
    ({ type, value }: { type: string; value?: any }): void;
}
