
// Helper function to get tokens from localStorage
export const getTokens = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);

    return {
        token: user?.token,
        refreshToken: user?.refreshToken
    };
};

// Helper function to update tokens if refreshed
export const replaceJWTIfRefreshed = (response) => {
    const newToken = response.headers['x-new-token'];
    if (newToken) {
        const user = JSON.parse(localStorage.getItem('user'));
        user.token = newToken;
        localStorage.setItem('user', JSON.stringify(user));
    }
};