// Custom hook for toggling display of an element

import { useState, useCallback } from 'react';

export const useToggle = ( initialValue=true ) => {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);

    return [value, toggle];
}