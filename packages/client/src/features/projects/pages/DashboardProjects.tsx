import { useModalStore } from '../../../store/useModalStore';
import { useGetProjects } from '../../../api/projects.api'

import { ModalWrapper } from '../../../components/ui/ModalWrapper';
import { EmptyProjectState } from '../../../components/ui/EmptyProjectState';
import { ProjectListComponent } from '../components/ProjectListComponent';

import LoadingSpinner from '../../../assets/svg/loading-spinner.svg?react'

import type { JSX } from 'react';



export const DashboardProjects = (): JSX.Element => {

    const isOpen = useModalStore((state) => state.isOpen)
    const { isLoading, isPending, projects = [] } = useGetProjects()

    if (isPending || isLoading) {
        return (
            <div className='dashboard-projects-loading-state'>
                <LoadingSpinner />
                <h4>Fetching existing projects..</h4>
            </div>
        );
    }


    return (
        <section>
            {projects.length > 0 ?
                <ProjectListComponent projects={projects}/>
                :
                <EmptyProjectState />
            }
        {isOpen && <ModalWrapper />}
        </section>
    )
}