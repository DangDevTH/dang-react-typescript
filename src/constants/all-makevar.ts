import { makeVar } from "@apollo/client";

export const authenticatedVar = makeVar(false);
export const isLoadingVar = makeVar(true);
export const userIdVar = makeVar<string>('');
export const userNameVar = makeVar<string>('');