type EntitiesMap<K extends number | string, EntityT> = Record<K, EntityT>;

export type CollectionModel<K extends number | string, EntityT> = {
  order: K[];
  entities: EntitiesMap<K, EntityT>;
};

export const getInitialCollection = <K extends number | string, EntityT>(): CollectionModel<
  K,
  EntityT
> => ({
  order: [],
  entities: {} as EntitiesMap<K, EntityT>,
});

export const normalizeCollection = <K extends number | string, EntityT>(
  elements: EntityT[],
  getElementKey: (element: EntityT) => K
): CollectionModel<K, EntityT> => {
  const collection = getInitialCollection<K, EntityT>();

  elements.forEach((el) => {
    const id = getElementKey(el);
    collection.order.push(id);
    collection.entities[id] = el;
  });

  return collection;
};

export const linearizeCollection = <K extends number | string, EntityT>(
  elements: CollectionModel<K, EntityT>
): EntityT[] => {
  return elements.order.map((id) => elements.entities[id]);
};
