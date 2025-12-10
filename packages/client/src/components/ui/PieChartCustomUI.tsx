import type { CustomTooltipProps, PieLabelRenderProps } from 'src/types/domain.types';
import type { JSX } from 'react';


// Custom tooltip for the pie chart
export const CustomTooltip = ({ active, payload, pieChartDataMap }: CustomTooltipProps): JSX.Element | null => {

    if (active && payload && payload.length) {
        const category = payload[0].payload.category;
        const data = pieChartDataMap[category];

        return (
            <div className='pie-tooltip-div'>
                <span className='pie-tooltip-title'>{category}:</span>
                <p className='pie-tooltip-counts'>Total Projects: {data.categoryTotalProjects}</p>
                <p className='pie-tooltip-counts'>Total tasks: {data.total_tasks}</p>
                <p className='pie-tooltip-counts'>
                    Completed tasks: {data.total_completed}
                </p>
                <p className='pie-tooltip-counts'>
                    Incompleted tasks: {data.total_not_completed}
                </p>
            </div>
        );
    }

    return null;
};



// Custom label from recharts to show percentages
export const RenderCustomizedLabel = ({ cx, cy, midAngle = 0, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {

    const RADIAN = Math.PI / 180;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.65;
    const x = cx + radius * Math.cos(-(midAngle) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle) * RADIAN);

    return (
        <text x={x} y={y} fill='white' fontSize={16} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};