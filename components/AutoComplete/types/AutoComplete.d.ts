export interface AutoCompleteProps {
  id?: string;
  labelId?: string;
  isVisible?: boolean;
  query?: string;
  toggleVisibility:(e)=>void;
  onSelect:(e)=>void;
}
