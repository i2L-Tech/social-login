// CONTROLLER: LOGIN CONTROLLER TO MANAGE ALL LOGIN RELATED LOGICS
// ====================================================================================================================

import { useEffect, useState } from "react";
import { useAuth } from "../../shared/context/AuthContext";
import useGoogleAuth from "../../shared/hooks/useGoogleAuth";
import { User } from "../../shared/models/UserModel";
import { AuthService } from "../../shared/services/AuthServices";

// ====================================================================================================================

// controller function to call google auth service an then get user data
const useGoogleAuthController = () => {
  const { response, promptAsync, fetchUserInfo } = useGoogleAuth();
  const [error, setError] = useState(null); // for tracking login error

  const { setUser } = useAuth();

  const handleLoginPress = () => {
    setError(null); // Reset errors before attempting login
    promptAsync();
  };

  //listen for response and fetch user data
  useEffect(() => {
    const processLogin = async () => {
      if (response?.type === "success") {
        try {
          const userInfo = await fetchUserInfo(
            response.authentication.accessToken
          );
          if (!userInfo || !userInfo.email) {
            throw new Error("Failed to fetch user data");
          }
          // Save the info on storage as well as in the context
          await AuthService.saveUser(userInfo as User);
          console.log("useGoogleAuthController: User profile saved");
          await AuthService.saveToken(response.authentication.accessToken);
          console.log("useGoogleAuthController: token saved");
          setUser(userInfo);
          console.log("useGoogleAuthController: Login Successful");
        } catch (error) {
          setError("Authentication failed. Please try again");
        }
      } else if (response?.type === "error") {
        setError("Authentication failed. Please try again");
      }
    };
    processLogin();
  }, [response]); // it runs everytime response changes

  return { handleLoginPress, error };
};

export default useGoogleAuthController;
// ====================================================================================================================
