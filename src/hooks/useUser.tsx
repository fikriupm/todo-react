import { useContext, useEffect } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useUser must be used within AppContextProvider");
  }
  const { user, setUser, clearUser } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        // Skip calling profile when no token exists to avoid needless 403s
        const token = localStorage.getItem("token");
        if (!token) {
          if (isMounted) {
            clearUser();
            navigate("/login");
          }
          return;
        }
        const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);

        if (isMounted && response.data) {
          setUser(response.data);
        }
      
      } catch (error) {
        console.log("Error fetching user info:", error);
        if(isMounted){
          clearUser();
          navigate("/login");
        }  
      }
    }
    fetchUserInfo();
    return () => {
      isMounted = false;
    }
  }, [setUser, clearUser, navigate, user]);

}
