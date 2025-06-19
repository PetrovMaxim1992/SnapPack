import { useState, useEffect } from 'react';

export const useListsCounter = (array: any[]) => {
    const [count, setCount] = useState(array.length);

    useEffect(() => {
        setCount(array.length);
        // Дополнительная логика при изменении
    }, [array]);

    return count;
};
