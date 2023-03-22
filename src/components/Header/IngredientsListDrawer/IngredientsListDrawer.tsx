import { FC, MutableRefObject, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import Button from '@components/Button';
import Drawer from '@components/Drawer';
import placeholder from '@static/images/cat-sit.png';
import { useIngredientsListStore } from '@stores/RootStore';

import IngredientCard from './IngredientCard';

type IngredientsListDrawerProps = {
  isOpen: boolean;
  closeDrawer: VoidFunction;
  openButtonRef: MutableRefObject<HTMLButtonElement | null>;
};

const IngredientsListDrawer: FC<IngredientsListDrawerProps> = ({
  isOpen,
  closeDrawer,
  openButtonRef,
}) => {
  const { list, initIngredientsList, clearIngredientsList } = useIngredientsListStore();

  useEffect(() => {
    initIngredientsList();
  }, []);

  return (
    <Drawer
      open={isOpen}
      onClose={closeDrawer}
      title="Shopping list"
      openButtonRef={openButtonRef}
      footer={
        <Button
          onClick={clearIngredientsList}
          disabled={!list.length}
          height=""
          padding="10px 28px"
        >
          Clear all
        </Button>
      }
      empty={<img src={placeholder} alt="empty shopping list" />}
    >
      {!!list.length &&
        list.map((ingredient) => <IngredientCard key={ingredient.id} {...ingredient} />)}
    </Drawer>
  );
};

export default observer(IngredientsListDrawer);
