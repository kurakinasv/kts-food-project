import { FC, useCallback } from 'react';

import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';

import Alert, { useAlert } from '@components/Alert';
import { PlusIcon, XMarkIcon } from '@static/icons';
import { SimilarRecipeModel } from '@stores/models/similarRecipe';
import { useCollectionStore } from '@stores/RootStore';
import { formPlural } from '@utils/formPlural';

import {
  CardWrapper,
  RecipeInfo,
  RecipeName,
  StyledButton,
  Tag,
  Tags,
} from './SimilarRecipeCard.styles';

type SimilarRecipeCardProps = SimilarRecipeModel & {
  onClick: VoidFunction;
};

const SimilarRecipeCard: FC<SimilarRecipeCardProps> = ({
  id,
  title,
  readyInMinutes,
  servings,
  onClick,
}) => {
  const { colors } = useTheme();
  const { isOpen, openAlert } = useAlert();

  const { addToCollection, isRecipeExistInCollection } = useCollectionStore();

  const addButtonHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      addToCollection(id);
      openAlert();
    },
    [id, addToCollection, openAlert]
  );

  return (
    <>
      <Alert
        message={isRecipeExistInCollection(id) ? 'Added to collection' : 'Removed from collection'}
        status="success"
        open={isOpen}
      />

      <CardWrapper onClick={onClick}>
        <RecipeInfo>
          <RecipeName>{title}</RecipeName>
          <Tags>
            <Tag color="red">
              {readyInMinutes} {formPlural('minute', readyInMinutes)}
            </Tag>
            <Tag color="purple">
              {servings} {formPlural('serving', servings)}
            </Tag>
          </Tags>
        </RecipeInfo>

        <StyledButton
          title={isRecipeExistInCollection(id) ? 'Remove from collection' : 'Add to collection'}
          onClick={addButtonHandler}
          icon={
            isRecipeExistInCollection(id) ? <XMarkIcon fillColor={colors.white} /> : <PlusIcon />
          }
        />
      </CardWrapper>
    </>
  );
};

export default observer(SimilarRecipeCard);
