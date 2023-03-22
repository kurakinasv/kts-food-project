import { useRootStore } from './context';

export const useQueryStore = () => useRootStore().queryStore;
export const useRecipes = () => useRootStore().recipesStore;
export const useCollectionStore = () => useRootStore().collectionStore;
export const useMetaStore = () => useRootStore().metaStore;
export const useIngredientsListStore = () => useRootStore().ingredientsListStore;
export const useUIStore = () => useRootStore().uiStore;
