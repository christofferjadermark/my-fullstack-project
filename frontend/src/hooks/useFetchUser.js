"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useFetchUser = (email) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        fetch(`/users/${email}`)
            .then(response => response.json())
            .then(data => {
            setUser(data);
            setLoading(false);
        })
            .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, [email]);
    return { user, loading, error };
};
exports.default = useFetchUser;
