import { useMemo } from 'react'
import { format, parseISO } from 'date-fns'

import { EmptyTaskActivityChart } from '../../../components/ui/EmptyTaskActivityChart';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import type { TaskActivityMetricProps } from '../../../types/domain.types'
import type { JSX } from 'react';


export const TaskActivityChart = ({ taskMetrics }: { taskMetrics: TaskActivityMetricProps[] }): JSX.Element => {


    const formattedChart = useMemo(() => {
        return taskMetrics.map(metric => {

            const dateString = metric.day.split('Z')[0];

            const dateObject = new Date(dateString)
            return {
                day: format(dateObject, 'yyyy-MM-dd'),
                count: metric.count
            }
        })
    }, [taskMetrics])

    const formatShortDate = (tickItem: string) => {
        return format(parseISO(tickItem), 'EEE');
    };


    const tasksCount = formattedChart.reduce((acc, metric) => acc + metric.count, 0)

    return (
        <section className='activity-charts-section'>
            <div className='activity-chart-header'>
                <h5>Global tasks statistics</h5>
            </div>
            {tasksCount > 0 ?
                <>
                    <div>
                        <ResponsiveContainer width='100%' height={200}>
                            <BarChart
                                width={320}
                                height={200}
                                data={formattedChart}
                                margin={{
                                    right: 30,
                                    left: -20
                                }}
                            >
                                <CartesianGrid strokeDasharray='3 3' stroke='#b6b4b4ff' />
                                <XAxis
                                    dataKey='day'
                                    interval={0}
                                    tickFormatter={formatShortDate}
                                    tick={{ fontSize: 14 }}
                                />
                                <YAxis dataKey='count' allowDecimals={false} tickCount={5} tick={{ fontSize: 15 }} />
                                <Tooltip
                                    cursor={{ fill: 'var(--color-secondary)', fillOpacity: 0.1 }}
                                />
                                <Bar
                                    dataKey='count'
                                    fill='var(--color-primary)'
                                    activeBar={{ fill: 'var(--color-secondary)' }}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className='activity-chart-bottom'>
                        <div className='activity-chart-square'></div>
                        <span>Tasks completed</span>
                    </div></>
                :
                <EmptyTaskActivityChart />
            }
        </section>
    )
}