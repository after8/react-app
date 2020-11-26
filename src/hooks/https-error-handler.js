import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  // To run code before component is rendered you used
  // componentWillMount()
  // Now you can just run the code before jsx gets rendered without any functioni
  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  // componentWillUnmount()
  // useEffect -> cleanup function
  // put code in return function
  // empty dependencies or the Interceptors
  // if we want to run the return function on onmount
  // whenever the Interceptors change
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
