type InstructionStepsApi = {
  equipment: Array<unknown>;
  ingredients: Array<unknown>;
  length?: {
    number: number;
    unit: string;
  };
  number: number; // number of step
  step: string;
};

export type AnalyzedInstructionsApi = {
  name: string;
  steps: InstructionStepsApi[];
};

export type InstructionStepsModel = {
  number: number; // number of step
  step: string;
};

export const normalizeSteps = (steps: InstructionStepsApi[]): InstructionStepsModel[] =>
  steps.map(({ number, step }) => ({ number, step }));

export const normalizeInstructions = (
  apiInstructions: AnalyzedInstructionsApi[]
): InstructionStepsApi[] => {
  if (!apiInstructions.length) {
    return [];
  }

  // adding name property to the first step
  const instructions = apiInstructions.map(({ name, steps }) => {
    const [step1, ...subSteps] = steps;
    const nameToAdd = !!name ? name + '. ' : '';
    return [{ ...step1, step: `${nameToAdd}${step1.step}` }, ...subSteps];
  });

  return instructions.flat();
};
