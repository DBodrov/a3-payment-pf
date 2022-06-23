import React from 'react';

const initState = {
  phone: '',
  email: '',
  isAgree: false,
};

type TClientInfoState = typeof initState;

const clientInfoReducer = (state: TClientInfoState, change: Partial<TClientInfoState>) => ({
  ...state,
  ...change,
});

export function useClientInfo() {
  const [{email, isAgree, phone}, dispatch] = React.useReducer(clientInfoReducer, initState);

  const handleChangeEmail = React.useCallback((email: string) => {
    dispatch({email});
  }, []);
  const handleChangePhone = React.useCallback((phone: string) => {
    dispatch({phone});
  }, []);
  const handleChangeAgreement = React.useCallback((isAgree: boolean) => {
    dispatch({isAgree});
  }, []);

  const resetForm = React.useCallback(() => {
    dispatch(initState);
  }, [])

  return {
    handleChangeAgreement,
    handleChangeEmail,
    handleChangePhone,
    resetForm,
    email,
    phone,
    isAgree,
  };
}

export type TClientInfo = {
  handleChangeAgreement: (isAgree: boolean) => void;
  handleChangeEmail: (email: string) => void;
  handleChangePhone: (phone: string) => void;
  resetForm: () => void;
  email: string;
  phone: string;
  isAgree: boolean;
};
