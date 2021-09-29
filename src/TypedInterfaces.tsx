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
    isgroupproject: boolean;
    users: string[];
    projectProgram: IProgram[];
    projectResearchArea: IResearchArea[];
}
