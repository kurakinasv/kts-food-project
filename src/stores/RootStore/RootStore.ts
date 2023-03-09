import QueryStore from '@stores/QueryStore';
import RecipesStore from '@stores/RecipesStore';

class RootStore {
  public readonly queryStore = new QueryStore(this);
  public readonly recipesStore = new RecipesStore(this);
}

export default RootStore;
