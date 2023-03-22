export enum RouterPaths {
  recipes = '/',
  recipe = '/recipe/:id',
  collection = '/collection',
}

export const routes = {
  recipes: {
    mask: RouterPaths.recipes,
  },
  recipe: {
    mask: RouterPaths.recipe,
    id: (id: number | string) => `/recipe/${String(id)}`,
  },
  collection: {
    mask: RouterPaths.collection,
  },
};
