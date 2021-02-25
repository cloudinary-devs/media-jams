import { Flex, IconButton, Slide as TransitionSlide } from '@chakra-ui/react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export function Slide({
  interval,
  borderRadius = '8px',
  colorScheme,
  children,
  ...rest
}) {
  const [mount, setMount] = React.useState();

  React.useEffect(() => {
    const changeSlideInterval = setInterval(() => {
      setMount(true);
    }, interval);

    return () => {
      setMount(false);
      clearInterval(changeSlideInterval);
    };
  }, []);

  return (
    <Flex
      borderRadius={borderRadius}
      w="100%"
      h="100%"
      bg={`${colorScheme}.200`}
      {...rest}
    >
      {children}
    </Flex>
  );
}

export function Carousel({
  slides,
  borderRadius = '8px',
  interval = 5000,
  height = '420px',
  width = '40%',
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
          ...state,
          index: state.index === state.maxSlides - 1 ? 0 : state.index + 1,
        };
      case 'PREVIOUS_SLIDE':
        return {
          ...state,
          index: state.index === 0 ? state.maxSlides - 1 : state.index - 1,
        };
    }
  }

  React.useEffect(() => {
    const changeSlideInterval = setInterval(() => {
      dispatch({ type: 'NEXT_SLIDE' });
    }, interval);

    return () => clearInterval(changeSlideInterval);
  }, []);

  let CurrentSlide = state.slides[state.index];

  return (
    <>
      <Flex
        position="relative"
        borderRadius={borderRadius}
        h={height}
        w={width}
        mt={8}
        {...rest}
      >
        <CurrentSlide interval={interval} />
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
