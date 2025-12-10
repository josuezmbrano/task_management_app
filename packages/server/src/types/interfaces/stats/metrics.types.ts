export interface TaskActivityMetric {
    day: string
    count: number
}

export interface RawMetricResult {
    day: Date;
    count: number;
}

export interface RawChartPieMetricResult {
    category: string
    category_total_projects: number
    total_tasks: number
    total_completed: number
    total_not_completed: number
}

export interface ChartPieMetrics {
    category: string
    projectPercentage: number
    categoryTotalProjects: number
    total_tasks: number
    total_completed: number
    total_not_completed: number
}