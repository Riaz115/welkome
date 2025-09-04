import { createContext, useContext, useState } from 'react';

const StepperContext = createContext({ sellerData: '', setSellerData: null });

export function UseContextProvider({ children }) {
  const [sellerData, setSellerData] = useState('');

  return (
    <StepperContext.Provider value={{ sellerData, setSellerData }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { sellerData, setSellerData } = useContext(StepperContext);

  return { sellerData, setSellerData };
}
