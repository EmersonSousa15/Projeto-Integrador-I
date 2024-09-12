import { createContext, useState } from "react";

export const PageChange = createContext();

export const PageChangeProvider = ({children}) => {
    const [count, setCount] = useState(0);

    return(
        <PageChange.Provider value={{count, setCount}}>
            {children}
        </PageChange.Provider>
    );
}
