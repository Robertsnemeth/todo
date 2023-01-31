import  { useContext, useState, useEffect, useRef, createContext } from 'react';
import { auth, db } from 'firesbase/clientApp';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext<any>(null)

export function useAuth() {
    return useContext(AuthContext)
}

type Props = {
    children: JSX.Element
}

export function UserProvider({children}:Props) {
    
    const [ currentUser, setCurrentUser ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const userInfo = useRef();

    function signUp(email:string, password:string) {
        createUserWithEmailAndPassword(auth, email, password);
        return
    }

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user:any) => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login, 
        signUp,
        logout,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
