

function setAuthToken(token) {
    try {
      localStorage.setItem("Logintoken", JSON.stringify(token));
    } catch (e) {
      console.error("Error storing token", e);
    }
  }
  function setAutUserDetails(data) {
    try {
      localStorage.setItem("Logintoken-user-data", JSON.stringify(data));
    } catch (e) {
      console.error("Error storing token", e);
    }
  }
  
  function getAuthToken() {
    try {
      return JSON.parse(localStorage.getItem("Logintoken") || "") ;
    } catch (e) {
      return null;
    }
  }
  function getAuthUser() {
    try {
      return JSON.parse(localStorage.getItem("Logintoken-user-data") || "") ;
    } catch (e) {
      return null;
    }
  }
  
  function getAuthTokenDetails(){
    try {
      const token = getAuthToken();
      return token
        ? token
        : null;
    } catch (e) {
      return null;
    }
  }
  function getAuthUserDetails(){
    try {
      const details = getAuthUser();
      return details
        ? details
        : null;
    } catch (e) {
      return null;
    }
  }
  
  function isAuthenticatedUser() {
    const tokenDetails = getAuthUserDetails();
    if (tokenDetails) {
      return true
    } else {
      return false;
    }
  }
  
  
  
  function clearAuthToken() {
    localStorage.removeItem("Logintoken");
  }
  
  
  const TokenService = {
    setAuthToken,
    getAuthToken,
    getAuthUserDetails,
    getAuthUser,
    getAuthTokenDetails,
    isAuthenticatedUser,
    setAutUserDetails,
    clearAuthToken,
  };
  
  export default TokenService;
  