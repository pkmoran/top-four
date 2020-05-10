import { h } from 'preact';
import { useEffect, useState, useRef } from 'preact/hooks';
import SwipeableViews from 'react-swipeable-views';
import { Button } from '@material-ui/core';

const Slider = ({ children }) => {
  const [step, setStep] = useState(0);
  const updateHeight = useRef(() => {});

  useEffect(() => {
    updateHeight.current();
  }, [step]);

  const handleBack = () => setStep(step - 1);
  const handleNext = () => setStep(step + 1);

  return (
    <div class="slider">
      <SwipeableViews
        index={step}
        action={actions => (updateHeight.current = actions.updateHeight)}
        animateHeight={true}
      >
        {children.map(child => (
          <div>{child}</div>
        ))}
      </SwipeableViews>
      <div class="slider__buttons">
        <Button color="primary" disabled={step === 0} onClick={handleBack}>
          &lt; prev
        </Button>

        <Button
          color="primary"
          disabled={step === children.length - 1}
          onClick={handleNext}
        >
          next &gt;
        </Button>
      </div>
    </div>
  );
};

export default Slider;
