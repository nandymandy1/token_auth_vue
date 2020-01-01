import ax from "axios";

const authReq = ax.create({
  //   baseURL: "https://vue-auth-82c2e.firebaseio.com/"
  baseURL: "https://identitytoolkit.googleapis.com/v1/"
});

// authReq.defaults.headers.common["SOMETHING"] = "something";

export default authReq;

// https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]

// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=

// https://securetoken.googleapis.com/v1/token?key=[API_KEY]

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
