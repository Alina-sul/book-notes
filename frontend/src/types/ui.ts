// UI-related types

export type ViewMode = 'list' | 'grid';

export interface BookFilters {
  reading: boolean;
  finished: boolean;
  wishlist: boolean;
}

export interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddBookClick: () => void;
}

export interface SidebarProps {
  filters: BookFilters;
  onFilterChange: (filterType: keyof BookFilters) => void;
}