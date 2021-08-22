export * from "./AutoComplete";
export interface AutoCompleteProps {
  id?: string;
  labelId?: string;
  isVisible?: boolean;
  toggleVisibility: (e) => void;
  onSelect: (e) => void;
  query?: string;
}
