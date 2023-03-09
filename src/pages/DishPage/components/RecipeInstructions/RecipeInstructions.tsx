import React, { FC, memo, useCallback } from 'react';

import { InstructionStepsModel } from '@stores/models/instructions';

import { InstructionsWrapper, RecipeSteps } from './RecipeInstructions.styles';

type RecipeInstructionsProps = {
  steps: InstructionStepsModel[];
};

const RecipeInstructions: FC<RecipeInstructionsProps> = ({ steps }) => {
  const getStepParagraphs = useCallback((text: string) => {
    const sentences = text.split('.');

    if (sentences.length < 2 || !sentences[1]) {
      return [text];
    }

    const paragraphs: string[] = [];

    for (const currSentence of sentences) {
      const lastSentence = paragraphs.at(-1);

      if (!currSentence) {
        continue;
      }

      if (currSentence.startsWith(' ')) {
        const concated = lastSentence + currSentence + '.';
        paragraphs.pop();
        paragraphs.push(concated);
      } else {
        paragraphs.push(`${currSentence}.`);
      }
    }

    return paragraphs;
  }, []);

  return (
    <InstructionsWrapper>
      <h3>Recipe instructions</h3>

      <RecipeSteps>
        {steps.map(({ step, number }, i) => (
          <li key={`${number}${i}`}>
            {getStepParagraphs(step).map((subStep, i) => (
              <React.Fragment key={i + subStep[0]}>
                {subStep}
                <br />
              </React.Fragment>
            ))}
          </li>
        ))}
      </RecipeSteps>
    </InstructionsWrapper>
  );
};

export default memo(RecipeInstructions);
