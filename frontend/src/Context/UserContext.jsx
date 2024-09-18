import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({
        identity: "",
        email: "",
        name: "",
        telephone: "",
        accountCPF: "",
        accountHolder: "",
        accountNumber: "",
        agencyNumber: "",
        accountCode: "",
        cep: "",
        city: "",
        neighborhood: "",
        residenceNumber: "",
        state: "",
        street: "",
        adicional: "",
        cardName: "",
        numbercard: "",
        cardExpireDate: "",
        cvvcard: "",
    });


    const updateUserData = (newData) => {
        setUserData({
            ...newData
        });
    };


    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('O usuário não está logado');
    }
    return context;
};
