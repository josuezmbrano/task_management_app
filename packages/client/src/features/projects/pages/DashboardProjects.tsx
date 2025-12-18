import { useState } from 'react'
import { useModalStore } from '../../../store/useModalStore';
import { useGetProjects } from '../../../api/projects.api'
import { useFilterHelper } from '../../../hooks/useFilterHelper';

import { ModalWrapper } from '../../../components/ui/ModalWrapper';
import { EmptyProjectState } from '../../../components/ui/EmptyProjectState';
import { NoMatchFilters } from '../../../components/ui/NoMatchFilters';
import { ProjectListComponent } from '../components/ProjectListComponent';

import LoadingSpinner from '../../../assets/svg/loading-spinner.svg?react'

import type { JSX } from 'react';
import type { ChangeEvent } from 'react'



export const DashboardProjects = (): JSX.Element => {

    const isOpen = useModalStore((state) => state.isOpen)
    const [filterValues, setFilterValues] = useState({ category: '', status: '' })


    const filterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFilterValues(prevFilters => ({ ...prevFilters, [name]: value }))
    }

    const { activeFilters } = useFilterHelper(filterValues)

    const { isLoading, isPending, projects = { totalInDatabase: 0, filteredProjects: [] } } = useGetProjects(activeFilters)


    if (isPending || isLoading) {
        return (
            <div className='dashboard-projects-loading-state'>
                <LoadingSpinner />
                <h4>Fetching existing projects..</h4>
            </div>
        );
    }


    const renderProjectsContent = () => {

        if (projects.filteredProjects.length > 0) {
            return <ProjectListComponent projects={projects.filteredProjects} />;
        }

        if (projects.totalInDatabase === 0) {
            return <EmptyProjectState />;
        }

        return <NoMatchFilters />;
    };


    return (
        <section>
            {projects.totalInDatabase !== 0 && 
            <div className='project-list-filter'>
                <select name='category' onChange={filterHandler}>
                    <option value=''>All</option>
                    <option value='Development/Engineering'>Development/Engineering</option>
                    <option value='Design/UX'>Design/UX</option>
                    <option value='Maintenance/Support'>Maintenance/Support</option>
                    <option value='Infrastructure/Devops'>Infrastructure/Devops</option>
                    <option value='Data analysis'>Data analysis</option>
                    <option value='Marketing/Sales'>Marketing/Sales</option>
                </select>
                <select name='status' onChange={filterHandler}>
                    <option value=''>All</option>
                    <option value='pending'>Pending</option>
                    <option value='on-hold'>On-hold</option>
                    <option value='in-progress'>In-progress</option>
                    <option value='completed'>Completed</option>
                </select>
            </div>}

            {renderProjectsContent()}
            {isOpen && <ModalWrapper />}

        </section>
    )
}