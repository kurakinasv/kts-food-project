import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import Button from '@components/Button';
import { XMarkIcon } from '@static/icons';
import { MeasuresModel } from '@stores/models/ingredients';
import { useIngredientsListStore } from '@stores/RootStore';
import { ImageURL, UniqueId } from '@typings/common';
import { getIngredientMeasuresString } from '@utils/getIngredientMeasuresString';
import { replaceImage } from '@utils/replaceImage';

import {
  CardWrapper,
  CardInfo,
  Name,
  Measures,
  ImageWrapper,
  CardImage,
} from './IngredientCard.styles';

type IngredientCardProps = {
  id: UniqueId;
  name: string;
  image: ImageURL;
  measures: MeasuresModel;
};

const IngredientCard: FC<IngredientCardProps> = ({ id, name, image, measures }) => {
  const { deleteFromList } = useIngredientsListStore();

  const deleteIngredient = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFromList(id);
  };

  return (
    <CardWrapper>
      <ImageWrapper>
        <CardImage src={image} onError={replaceImage} alt="ingredient" />
      </ImageWrapper>

      <CardInfo>
        <Name>{name}</Name>
        <Measures>{getIngredientMeasuresString(measures)}</Measures>
      </CardInfo>

      <Button
        icon={<XMarkIcon fillColor="white" />}
        onClick={deleteIngredient}
        shape="circle"
        padding="0"
        width="30px"
        minWidth="30px"
      />
    </CardWrapper>
  );
};

export default observer(IngredientCard);
