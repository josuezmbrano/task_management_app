import { createBrowserRouter, Navigate } from 'react-router';

import { RootLayout } from '../components/layout/RootLayout';
import { Home } from '../pages/Home';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { About } from '../pages/About';

import { AuthRequired } from '../components/layout/AuthRequired';

import { SessionLayout } from '../components/layout/SessionLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';

import { DashboardProjects } from '../features/projects/pages/DashboardProjects';
import { ProjectDetail } from '../features/projects/pages/ProjectDetail';
import { ProductivityPage } from '../features/productivity/pages/ProductivityPage';



export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            // Public routes go here
            { index: true, Component: Home },
            { path: 'login', Component: LoginPage },
            { path: 'register', Component: RegisterPage },
            { path: 'about', Component: About },
            {
                // 1. FIRST LEVEL: AUTH REQUIRED WRAPPER
                Component: AuthRequired,
                children: [
                    {
                        //2. SECOND LEVEL: UNIVERSAL SESSION LAYOUT
                        Component: SessionLayout,
                        path: 'session',
                        children: [
                            { index: true, element: <Navigate to='projects' replace /> },
                            {
                                //3. THIRD LEVEL: DASHBOARD LAYOUT (PROJECTS AND PRODUCTIVITY)
                                Component: DashboardLayout,
                                children: [
                                    { path: 'projects', Component: DashboardProjects },
                                    { path: 'projects/:projectId', Component: ProjectDetail },
                                    { path: 'productivity', Component: ProductivityPage }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
])