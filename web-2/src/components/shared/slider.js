import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Glide from '@glidejs/glide';

import cx from 'utilities/cx';

const Slider = ({ children, confirmContent }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const glide = new Glide('.glide', {
      rewind: false,
      startsAt: step
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

  return (
    <div class="slider glide">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          {children.map(child => (
            <li class="glide__slide">{child}</li>
          ))}
        </ul>
      </div>

      <div class="slider__arrows glide__arrows" data-glide-el="controls">
        <button class={prevClasses} data-glide-dir="<">
          &lt; prev
        </button>

        {confirmContent && (
          <span
            class={confirmClasses}
            data-glide-dir={`=${children.length - 1}`}
          >
            {confirmContent}
          </span>
        )}

        <button class={nextClasses} data-glide-dir=">">
          next &gt;
        </button>
      </div>
    </div>
  );
};

export default Slider;
