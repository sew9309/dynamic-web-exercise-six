import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import Header from "@/app/components/Header";
import firebaseConfig from "@/app/components/firebaseConfig";
//import { Component, useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInformation, setUserInformation] = useState(null);

    //Initialize Firebase before accessing
    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, []);

    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();
            
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    //User is signed in
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else {
                    //User is Signed out
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                //setLoading to false when everything is complete
                setIsLoading(false);
            })
        }
    }, [appInitialized]);

    if (isLoading) return null;

    return (
        <>
        <Header />
        <Component
        {...pageProps}
        isLoggedIn={isLoggedIn}
        userInformation={userInformation}
        />
        </>
    );
}