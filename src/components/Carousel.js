import { Flex, Box, IconButton } from '@chakra-ui/react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export default function Carousel({
  slides,
  interval = 5000,
  height = '420px',
  width = '50%',
  ...rest
}) {
  const [state, dispatch] = React.useReducer(reducer, {
    index: Math.floor(Math.random() * slides.length),
    slides,
    maxSlides: slides.length,
  });

  function reducer(state, action) {
    switch (action.type) {
      case 'NEXT_SLIDE':
        return {
          index: state.index === state.maxSlides - 1 ? 0 : state.index + 1,
          slides: state.slides,
          maxSlides: state.maxSlides,
        };
      case 'PREVIOUS_SLIDE':
        return {
          index: state.index === 0 ? state.maxSlides - 1 : state.index - 1,
          slides: state.slides,
          maxSlides: state.maxSlides,
        };
      case 'RANDOM_SLIDE':
        return;
      default:
        return {
          index: state.index,
          slides: state.slides,
          maxSlides: state.maxSlides,
        };
    }
  }

  React.useEffect(() => {
    const changeSlideInterval = setInterval(() => {
      dispatch({ type: 'NEXT_SLIDE' });
    }, interval);

    return () => clearInterval(changeSlideInterval);
  }, []);

  let currentSlide = state.slides[state.index];

  return (
    <>
      <Flex h={height} w={width} mt={8} {...rest}>
        {currentSlide}
      </Flex>
      <Flex mt={3}>
        <IconButton
          mr={7}
          icon={<FaArrowLeft />}
          onClick={() => dispatch({ type: 'PREVIOUS_SLIDE' })}
        >
          Previous
        </IconButton>
        <IconButton
          icon={<FaArrowRight />}
          onClick={() => dispatch({ type: 'NEXT_SLIDE' })}
        >
          Next
        </IconButton>
      </Flex>
    </>
  );
}
