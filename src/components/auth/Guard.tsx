import React, { useEffect } from "react";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar, isLoadingVar, userIdVar } from "../../constants/all-makevar";
import { snackVar } from "../../constants/snack";
import {
  ERROR_FAILED_TO_FETCH_MESSAGE,
  ERROR_SERVER_MESSAGE,
  UNKNOWN_ERROR_SNACK_MESSAGE,
} from "../../constants/errors";
// import excludedRoutes from "../../constants/excluded-routes";
import Error from "../error/Error";
import Body from "../body/Body";

interface GuardProps {
  children: React.ReactNode;
}

const Guard = ({ children }: GuardProps): React.ReactElement => {
  const { data, loading, error } = useGetMe();


  useEffect(() => {
    if (data) {
      authenticatedVar(true);
      userIdVar(String(data.me.id));
    }else {
      authenticatedVar(false);
      userIdVar(String(''));
    }
  }, [data]);

  useEffect(() => {
    if (!loading) {
      isLoadingVar(loading);
    }
  }, [loading]);

  useEffect(() => {
    if (error?.message == "Failed to fetch") {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  if (error?.message == ERROR_FAILED_TO_FETCH_MESSAGE) {
    return (
      <Error
        message={ERROR_SERVER_MESSAGE}
        onRetry={() => {
          window.location.reload();
        }}
      />
    );
  }
  return (
    <div>
       { data ? <Body data={data}>{children}</Body> : <Body data={data}>{children}</Body> }
    </div>
  );
};

export default Guard;
