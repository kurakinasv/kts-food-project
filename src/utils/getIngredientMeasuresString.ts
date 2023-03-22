import { MeasuresModel } from '@stores/models/ingredients';

export const getIngredientMeasuresString = (measures: MeasuresModel) => {
  const { metric, us } = measures;
  let resultString: string;

  if (us.amount === metric.amount && us.unit === metric.unit) {
    resultString = `${us.amount} ${us.unit}`;
  } else {
    resultString = `${us.amount} ${us.unit} (${metric.amount} ${metric.unit})`;
  }

  return resultString.trim();
};
