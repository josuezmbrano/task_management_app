import { useEffect, useRef } from 'react'
import { useSessionMetrics } from '../api/user.api'
import { SessionStore } from '../store/useSessionStore'


const KEY_COUNTER_METRIC = 'counter'


export const useSessionCounter = (): void => {

    const { initializeAppLifetime, updateAppLifetime } = SessionStore()
    const { appTime, appTimePending } = useSessionMetrics()

    const isInitializedRef = useRef(false)

    useEffect(() => {

        if (appTimePending || !appTime) {
            return
        }


        if (!isInitializedRef.current) {
            const now = Date.now()
            const storedStartTime = localStorage.getItem(KEY_COUNTER_METRIC)

            let timeDeltaSeconds = 0

            if (storedStartTime) {

                const startTimeMs = parseInt(storedStartTime, 10)
                const timeDeltaMs = now - startTimeMs
                timeDeltaSeconds = Math.floor(timeDeltaMs / 1000)

            } else {

                localStorage.setItem(KEY_COUNTER_METRIC, now.toString())

            }

            const trueInitialTime = appTime + timeDeltaSeconds
            initializeAppLifetime(trueInitialTime)
            isInitializedRef.current = true

        }

        const intervalId = setInterval(() => {
            updateAppLifetime(prevValue => prevValue + 1)
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }

    }, [appTime, appTimePending, initializeAppLifetime, updateAppLifetime])
}