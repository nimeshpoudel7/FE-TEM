function setToken(token) {
  try {
    localStorage.setItem("token", JSON.stringify(token));
  } catch (e) {
    console.error("Error storing token", e);
  }
}
function setUserDetails(data) {
  try {
    localStorage.setItem("user-data", JSON.stringify(data));
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
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user-data") || "") ;
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
function getUserDetails(){
  try {
    const details = getUser();
    return details
      ? details
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
  localStorage.removeItem("user-data");
}


const TokenService = {
  setToken,
  getToken,
  getUserDetails,
  getUser,
  getTokenDetails,
  isAuthenticated,
  setUserDetails,
  clearToken,
};

export default TokenService;
