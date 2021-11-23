export * from "./AutoComplete";
export interface AutoCompleteProps {
  id?: string;
  labelId?: string;
  isVisible?: boolean;
  setIsSearchLoading: () => void;
  toggleVisibility: (e) => void;
  onSelect: (e) => void;
  query?: string;
}
