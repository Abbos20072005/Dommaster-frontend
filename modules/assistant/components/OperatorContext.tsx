'use client';

import React from 'react';

/** Opens the "Contact an operator" window: every operator button of the chat calls it. */
const OperatorContext = React.createContext<() => void>(() => undefined);

export const OperatorProvider = OperatorContext.Provider;

export const useOpenOperator = () => React.useContext(OperatorContext);
