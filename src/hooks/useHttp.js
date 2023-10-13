import { useCallback } from "react";

const useHttp = () => {
  const fetchRequest = useCallback(async (req = {}) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const userName = userEmail && userEmail.split('@')[0];
      const endPoint = req.id ? `/${req.id}` : "";
      const url = req.url || 
        `https://oct-2023-a573a-default-rtdb.firebaseio.com/expense-tracker/${userName}${endPoint}.json`;

      const response = await fetch(url,{
        method: req.method || 'GET',
        body: req.body ? JSON.stringify(req.body) : null,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        if(errData.error.message) {
          throw new Error(errData.error.message);
        }
        throw new Error(errData.error);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      throw new Error(error);
    }
  }, []); 

  return fetchRequest;
};

export default useHttp;
