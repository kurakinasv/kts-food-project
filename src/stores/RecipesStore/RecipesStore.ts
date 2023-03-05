import { makeAutoObservable, runInAction } from 'mobx';

import { Option } from '@components/MultiDropdown';
import { mock } from '@pages/RecipesPage/mock';
import ApiRequest from '@stores/ApiRequest';
import { DishWithNutritionType } from '@stores/DishStore';
import MetaStore from '@stores/MetaStore';
import QueryStore from '@stores/QueryStore';
import RootStore from '@stores/RootStore';
import { AllRecipesPaths } from '@typings/api';
import { getAllRecipesUrl } from '@utils/getUrl';

import { IRecipesStore, normalizeRecipes, RecipesType } from './model';

type PrivateFields = '_queryStore' | '_meta' | 'currentOffset';

class RecipesStore implements IRecipesStore {
  private readonly _rootStore: RootStore;
  private readonly _queryStore: QueryStore;

  private readonly _apiRequest = new ApiRequest();
  private readonly _meta = new MetaStore();

  // todo call first 30 items
  private readonly requestItemsNumber = 20;

  public recipes: DishWithNutritionType[] | null = null;

  private currentOffset = 0;
  public totalResults: null | number = null;

  constructor(rootStore: RootStore) {
    makeAutoObservable<RecipesStore, PrivateFields>(this);
    this._rootStore = rootStore;
    this._queryStore = this._rootStore.queryStore;
  }

  get meta() {
    return this._meta;
  }

  private get mealTypes() {
    const type = this._queryStore.type;
    return !!type ? type.split(',') : [];
  }

  setRecipes = (recipes: DishWithNutritionType[]) => {
    this.recipes = recipes;
  };

  getAllRecipes = async (qStr?: string, typesOpts?: Option[]) => {
    this._meta.setLoading();
    this._onParamsUpdate({ qStr, typesOpts });
    this._queryStore.setParams({ offset: String(this.currentOffset) });

    const url = getAllRecipesUrl(AllRecipesPaths.complex, this._queryStore.getParams());

    try {
      const data = await this._apiRequest.request<RecipesType>(url);

      // todo delete mock
      // const mockData: RecipesType = { results: [], totalResults: 0 };
      // const eightyItems = Array(40)
      //   .fill([...mock])
      //   .flat();
      // mockData.results = [...eightyItems];
      // mockData.totalResults = mockData.results.length;

      // const data = await new Promise<RecipesType>((res) => {
      //   setTimeout(() => res(mockData), 2000);
      // });

      if (data) {
        this.setRecipes([...(this.recipes ?? []), ...normalizeRecipes(data)]);

        runInAction(() => {
          this.totalResults = data.totalResults;
          this.currentOffset += this.requestItemsNumber;
        });
      }
    } catch (error: any) {
      this._meta.setError(this._apiRequest.error);
      throw new Error(`getAllRecipes: ${error.message}`);
    }
    this._meta.setInitial();
  };

  private _onParamsUpdate = ({ qStr, typesOpts }: { qStr?: string; typesOpts?: Option[] }) => {
    const q = qStr?.toLocaleLowerCase();
    const types = typesOpts?.map((type) => type.key);

    const didQueryUpdate = q !== undefined && q !== this._queryStore.query;

    const didTypesUpdate =
      types !== undefined &&
      (types.length !== this.mealTypes.length ||
        types.every((type) => this.mealTypes.includes(type)));

    const didSearchUpdate = didQueryUpdate || didTypesUpdate;

    if (didQueryUpdate) {
      this._queryStore.setParams({ query: q });
    }

    if (didTypesUpdate) {
      this._queryStore.setParams({ type: types.join(',') });
    }

    this._queryStore.setParams({ number: String(this.requestItemsNumber) });

    if (didSearchUpdate) {
      this.setRecipes([]);
      this.currentOffset = 0;
      this._queryStore.setParams({ offset: String(0) });
    }
  };
}

export default RecipesStore;
