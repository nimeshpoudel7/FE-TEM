function setToken(token) {
  try {
    localStorage.setItem("auth", JSON.stringify(token));
  } catch (e) {
    console.error("Error storing token", e);
  }
}

function getToken() {
  try {
    return JSON.parse(localStorage.getItem("auth") || "") ;
  } catch (e) {
    return null;
  }
}

function getTokenDetails(){
  try {
    const token = getToken();
    return token
      ? (JSON.parse(
          window.atob(token.access_token.split(".")[1])
        ) )
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return tokenDetails.exp * 1000 > Date.now();
  } else {
    return false;
  }
}



function clearToken() {
  localStorage.removeItem("auth");
}


const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;
