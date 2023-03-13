import CollectionStore from '@stores/CollectionStore';
import IngredientsListStore from '@stores/IngredientsListStore';
import MetaStore from '@stores/MetaStore';
import QueryStore from '@stores/QueryStore';
import RecipesStore from '@stores/RecipesStore';
import UIStore from '@stores/UIStore';

class RootStore {
  public readonly queryStore = new QueryStore(this);
  public readonly recipesStore = new RecipesStore(this);
  public readonly collectionStore = new CollectionStore(this);
  public readonly metaStore = new MetaStore(this);
  public readonly ingredientsListStore = new IngredientsListStore(this);
  public readonly uiStore = new UIStore(this);
}

export default RootStore;
