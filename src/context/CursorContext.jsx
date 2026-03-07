import { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
    const [cursorVariant, setCursorVariant] = useState("default");
    const [cursorText, setCursorText] = useState("");

    const setCursorImage = () => {
        setCursorVariant("image");
        setCursorText("VIEW");
    };

    const setCursorButton = () => {
        setCursorVariant("button");
        setCursorText("CLICK");
    };

    const setCursorDefault = () => {
        setCursorVariant("default");
        setCursorText("");
    };

    return (
        <CursorContext.Provider value={{
            cursorVariant,
            cursorText,
            setCursorImage,
            setCursorButton,
            setCursorDefault,
        }}>
            {children}
        </CursorContext.Provider>
    );
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (!context) {
        throw new Error('useCursor must be used within a CursorProvider');
    }
    return context;
}
