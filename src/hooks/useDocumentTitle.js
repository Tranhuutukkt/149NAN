import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
    useLayoutEffect(() => {
        if (title) {
            document.title = title;
        } else {
            document.title = '149 Nguyen An Ninh';
        }
    }, [title]);
};

export default useDocumentTitle;