function setToken(token) {
  try {
    localStorage.setItem("token", JSON.stringify(token));
  } catch (e) {
    console.error("Error storing token", e);
  }
}

function getToken() {
  try {
    return JSON.parse(localStorage.getItem("token") || "") ;
  } catch (e) {
    return null;
  }
}

function getTokenDetails(){
  try {
    const token = getToken();
    return token
      ? token
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return true
  } else {
    return false;
  }
}



function clearToken() {
  localStorage.removeItem("token");
}


const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;
