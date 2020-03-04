import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Glide from '@glidejs/glide';
import { Button } from '@material-ui/core';

import cx from 'utilities/cx';

const Slider = ({ children, confirmContent, scrollableSteps }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const glide = new Glide('.glide', {
      rewind: false,
      startsAt: step,
      swipeThreshold: false,
      dragThreshold: false
    }).mount();

    glide.on('run', () => {
      setStep(glide.index);
    });
  }, []);

  const prevClasses = cx({
    'btn btn__secondary': true,
    'visibility--hidden': step === 0
  });

  const confirmClasses = cx({
    'visibility--hidden': step < children.length - 1
  });

  const nextClasses = cx({
    'btn btn__secondary': true,
    'visibility--hidden': step === children.length - 1
  });

  const trackClasses = cx('glide__track', {
    scrollable: scrollableSteps && scrollableSteps.includes(step)
  });

  return (
    <div class="slider glide">
      <div class={trackClasses} data-glide-el="track">
        <ul class="glide__slides">
          {children.map(child => (
            <li class="glide__slide">{child}</li>
          ))}
        </ul>
      </div>

      <div class="slider__arrows glide__arrows" data-glide-el="controls">
        <div class={prevClasses} data-glide-dir="<">
          <Button color="primary">&lt; prev</Button>
        </div>

        {confirmContent && (
          <span
            class={confirmClasses}
            data-glide-dir={`=${children.length - 1}`}
          >
            {confirmContent}
          </span>
        )}

        <div class={nextClasses} data-glide-dir=">">
          <Button color="primary">next &gt;</Button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
