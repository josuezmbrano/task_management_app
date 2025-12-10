
// PROJECT RELATED PROPS
export interface ProjectCardProps {
    title: string
    description: string
    status: string
    projectId: string
}


export interface EditProjectProps {
    projectId: string
    title: string
    description: string
    closeModal: () => void
}

export interface DeleteProjectProps {
    projectId: string
    closeModal: () => void
}

export interface ProjectsCountMetricsProps {
    total: number;
    pending: number;
    'on-hold': number;
    'in-progress': number;
    completed: number;
}


// TASKS RELATED PROPS
export interface CreateTaskProps {
    projectId: string
    closeModal: () => void
}

export interface DeleteTaskProps {
    projectId: string
    taskId: string
    closeModal: () => void
}

export interface EditTaskProps {
    title: string,
    description: string
    projectId: string
    taskId: string
    closeModal: () => void
}

export interface TaskCardProps {
    title: string
    description: string
    status: string
    completedAt: Date | null
    taskId: string
    projectId: string
}

export interface TaskActivityMetricProps {
    day: string
    count: number
}

// PIE CHART RELATED PROPS

export type ProjectCategory =
    | "Development/Engineering"
    | "Design/UX"
    | "Maintenance/Support"
    | "Infrastructure/Devops"
    | "Data analysis"
    | "Marketing/Sales"


export type ChartPieMetrics = {
    category: ProjectCategory
    projectPercentage: number
    categoryTotalProjects: number
    total_tasks: number
    total_completed: number
    total_not_completed: number
} & Record<string, unknown>

export interface PieLabelRenderProps {
    cx: number;
    cy: number;
    midAngle?: number;
    innerRadius: number;
    outerRadius: number;
    percent?: number;
}

interface ChartPiePayloadItem {
    value: number; 
    name: string;
    payload: ChartPieMetrics; 
}

export interface CustomTooltipProps {
    active?: boolean;
    payload?: readonly ChartPiePayloadItem[];
    label?: string | number;
    pieChartDataMap: Record<string, ChartPieMetrics>
}