import { useState, useEffect } from 'react';

import { useModalStore } from '../../store/useModalStore';

import { CircleX } from 'lucide-react';

import type { JSX } from 'react';



export const ModalWrapper = (): JSX.Element | null => {

    const { content, isOpen, closeModal } = useModalStore()

    const [renderedContent, setRenderedContent] = useState<JSX.Element | null>(null)


    useEffect(() => {

        if (isOpen) {
            setRenderedContent(content)
        } else {
            const timeouId = setTimeout(() => setRenderedContent(null), 300)
            return () => clearTimeout(timeouId)
        }

    }, [isOpen, content])


    if (!isOpen && !renderedContent) {
        return null
    }


    return (
        <div className='overlay'>
            <div className='modal-container'>
                <div className='modal-header'>
                    <button onClick={closeModal}><CircleX size={28} color='#181a2a' /></button>
                </div>
                {renderedContent}
            </div>
        </div>
    )

}