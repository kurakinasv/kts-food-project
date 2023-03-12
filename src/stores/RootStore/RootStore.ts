import CollectionStore from '@stores/CollectionStore';
import QueryStore from '@stores/QueryStore';
import RecipesStore from '@stores/RecipesStore';

class RootStore {
  public readonly queryStore = new QueryStore(this);
  public readonly recipesStore = new RecipesStore(this);
  public readonly collectionStore = new CollectionStore(this);
}

export default RootStore;
