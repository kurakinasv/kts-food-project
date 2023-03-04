import { useRootStore } from './context';

export const useQueryStore = () => useRootStore().queryStore;
export const useRecipes = () => useRootStore().recipesStore;