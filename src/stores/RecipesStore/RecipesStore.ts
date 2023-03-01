import { makeAutoObservable, runInAction } from 'mobx';

import { Option } from '@components/MultiDropdown';
import { mock } from '@pages/RecipesPage/mock';
import ApiRequest from '@stores/ApiRequest';
import { DishWithNutritionType } from '@stores/DishStore';
import QueryStore from '@stores/QueryStore';
import RootStore from '@stores/RootStore';
import { AllRecipesPaths } from '@typings/api';
import { getAllRecipesUrl } from '@utils/getUrl';

import { IRecipesStore, normalizeRecipes, RecipesType } from './model';

class RecipesStore implements IRecipesStore {
  private readonly _rootStore: RootStore;
  private readonly _queryStore: QueryStore;
  private readonly _apiRequest = new ApiRequest();

  // todo call first 30 items
  private readonly requestItemsNumber = 20;

  public recipes: DishWithNutritionType[] | null = null;

  private currentOffset = 0;
  public totalResults = 0;

  constructor(rootStore: RootStore) {
    makeAutoObservable<RecipesStore, '_rootStore'>(this);
    this._rootStore = rootStore;
    this._queryStore = this._rootStore.queryStore;
  }

  private get mealTypes() {
    return this._queryStore.type?.split(',') || [];
  }

  setRecipes = (recipes: DishWithNutritionType[]) => {
    this.recipes = recipes;
  };

  getAllRecipes = async (qStr?: string, typesOpts?: Option[]) => {
    this._onParamsUpdate({ qStr, typesOpts });

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
          this._queryStore.setParams({ offset: String(this.currentOffset) });
        });
      }
    } catch (error: any) {
      throw new Error('getAllRecipes', error.message);
    }
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

    this._queryStore.setParams({ number: String(this.requestItemsNumber) });

    if (didQueryUpdate) {
      this._queryStore.setParams({ query: q });
    }

    if (didTypesUpdate) {
      this._queryStore.setParams({ type: types.join(',') });
    }

    if (didSearchUpdate) {
      this.setRecipes([]);
      this.currentOffset = 0;
      this._queryStore.setParams({ offset: String(0) });
    }
  };
}

export default RecipesStore;
