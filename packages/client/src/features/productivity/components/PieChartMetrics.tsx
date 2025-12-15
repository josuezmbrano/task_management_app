import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CustomTooltip, RenderCustomizedLabel } from '../../../components/ui/PieChartCustomUI';

import type { ChartPieMetrics, ProjectCategory} from '../../../types/domain.types'
import type { JSX } from 'react';


const COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)', 'var(--color-info)', 'var(--color-success)', 'var(--color-error)'];

export const PieChartMetrics = ({ pieChartData }: { pieChartData: ChartPieMetrics[] }): JSX.Element => {

    const projectCategoryColorMap: Record<ProjectCategory, string> = {
        'Development/Engineering': COLORS[0],
        'Design/UX': COLORS[1],
        'Maintenance/Support': COLORS[2],
        'Infrastructure/Devops': COLORS[3],
        'Data analysis': COLORS[4],
        'Marketing/Sales': COLORS[5]
    }


    //Pie chart data map for the custom tooltip
    const pieChartDataMap = useMemo<Record<string, ChartPieMetrics>>(() => {
        return pieChartData.reduce<Record<string, ChartPieMetrics>>((acc, currentMetric) => {
            acc[currentMetric.category] = currentMetric
            return acc
        }, {})
    }, [pieChartData])



    return (
        <section className='activity-charts-section'>
            <div className='activity-chart-header'>
                <h5>Project/tasks statistics</h5>
            </div>
            <div>
                <ResponsiveContainer width='100%' height={260}>
                    <PieChart width={400} height={350}>
                        <Pie
                            data={pieChartData}
                            label={RenderCustomizedLabel}
                            labelLine={false}
                            outerRadius={120}
                            fill='#8884d8'
                            dataKey='projectPercentage'
                            nameKey='category'
                        >
                            {pieChartData.map((entry) => (
                                <Cell
                                    key={`cell-${entry.category}`}
                                    fill={projectCategoryColorMap[entry.category]}
                                />
                            ))}
                            <Tooltip content={<CustomTooltip pieChartDataMap={pieChartDataMap} />}/>
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className='pie-chart-bottom'>
                <div className='pie-chart-category-legend'>
                    <div className='pie-chart-square dev'></div>
                    <span>Dev/Eng</span>
                </div>
                <div className='pie-chart-category-legend'>
                    <div className='pie-chart-square ux'></div>
                    <span>UX</span>
                </div>
                <div className='pie-chart-category-legend'>
                    <div className='pie-chart-square maint'></div>
                    <span>Maint</span>
                </div>
                <div className='pie-chart-category-legend'>
                    <div className='pie-chart-square devops'></div>
                    <span>DevOps</span>
                </div>
                <div className='pie-chart-category-legend'>
                    <div className='pie-chart-square mktg'></div>
                    <span>Mktg</span>
                </div>
                <div className='pie-chart-category-legend'>
                    <div className='pie-chart-square da'></div>
                    <span>DA</span>
                </div>
            </div>
        </section>
    );
}