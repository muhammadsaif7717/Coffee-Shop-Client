import { createContext, useState } from "react";
import PropTypes from 'prop-types'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from "firebase/auth";
import auth from '../Firebase/firebase.config'


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loadeing, setLoading] = useState(true)

    //CREATE USER
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //SIGNIN USER
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }





    const userInfo = {
        user,
        createUser,
        setUser,
        signInUser,
        loadeing,

    }

    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node,
}