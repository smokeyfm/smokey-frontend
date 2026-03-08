import { createContext, useContext, useState, ReactNode } from 'react';

interface CityMorphContextType {
  conditionOverride: string | null;
  setConditionOverride: (name: string | null) => void;
}

const CityMorphContext = createContext<CityMorphContextType>({
  conditionOverride: null,
  setConditionOverride: () => {},
});

export function CityMorphProvider({ children }: { children: ReactNode }) {
  const [conditionOverride, setConditionOverride] = useState<string | null>(
    null,
  );
  return (
    <CityMorphContext.Provider value={{ conditionOverride, setConditionOverride }}>
      {children}
    </CityMorphContext.Provider>
  );
}

export function useCityMorph() {
  return useContext(CityMorphContext);
}
