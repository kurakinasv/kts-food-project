import QueryStore from '@stores/QueryStore';
import RecipesStore from '@stores/RecipesStore';

class RootStore {
  public queryStore = new QueryStore(this);
  public recipesStore = new RecipesStore(this);
}

export default RootStore;
