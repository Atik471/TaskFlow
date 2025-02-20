import PropTypes from "prop-types";
import { createContext } from "react";

export const APIcontext = createContext()

const APIprovider = ({ children }) => {

    const API = "http://localhost:5000"

    return (
        <APIcontext.Provider value={API}>
            {children}
        </APIcontext.Provider>
    );
};

APIprovider.propTypes = {
    children: PropTypes.object.isRequired,
}

export default APIprovider;