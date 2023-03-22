import { FC, memo } from 'react';

import { useNavigate } from 'react-router-dom';

import { routes } from '@config/routes';
import { SectionTitle } from '@pages/RecipePage/RecipePage.styles';
import { SimilarRecipeModel } from '@stores/models/similarRecipe';

import { SimilarList, Wrapper } from './SimilarRecipes.styles';
import SimilarRecipeCard from '../SimilarRecipeCard';

type SimilarRecipesProps = {
  recipes: SimilarRecipeModel[];
};

const SimilarRecipes: FC<SimilarRecipesProps> = ({ recipes }) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <SectionTitle>You may also like</SectionTitle>

      {!!recipes.length && (
        <SimilarList>
          {recipes.map((recipe) => (
            <SimilarRecipeCard
              key={recipe.id}
              onClick={() => navigate(routes.recipe.id(recipe.id))}
              readyInMinutes={recipe.readyInMinutes}
              servings={recipe.servings}
              title={recipe.title}
              id={recipe.id}
            />
          ))}
        </SimilarList>
      )}
    </Wrapper>
  );
};

export default memo(SimilarRecipes);
