import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, {
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import _ from 'lodash';
import {
  Badge,
  Box,
  Center,
  chakra,
  Flex,
  List,
  ListItem,
  ListProps,
  Stack,
  useColorModeValue,
  PropsOf,
} from '@chakra-ui/react';

function SidebarCategory(props) {
  const {
    isMobile,
    title,
    selected,
    opened,
    children,
    contentRef,
    ...rest
  } = props;

  const ref = useRef(null);

  const [{ toggle, shouldScroll = false }, setToggle] = useState({
    toggle: selected || opened,
  });

  // const onClick = () => {
  //   setToggle({ toggle: !toggle, shouldScroll: true })
  // }

  // If a category is selected indirectly, open it. This can happen when using the search input
  useEffect(() => {
    if (selected) {
      setToggle({ toggle: true, shouldScroll: true });
    }
  }, [selected]);

  // Navigate to the start of the category when manually opened
  useEffect(() => {
    if (!ref.current || !contentRef?.current) return;
    if (toggle && shouldScroll) {
      const contentEl = contentRef.current;

      if (toggle == true && contentEl) {
        // 10 is added for better margin
        const height =
          ref.current.offsetTop - (isMobile ? 10 : contentEl.offsetTop);
        contentEl.scrollTop = height;
        setToggle({ toggle });
      }
    }
  }, [toggle, shouldScroll, isMobile, contentRef]);

  return (
    <chakra.div mt="8" ref={ref} {...rest}>
      <chakra.p
        width="full"
        textTransform="uppercase"
        letterSpacing="wider"
        fontSize="xs"
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
        color={useColorModeValue('gray.500', 'inherit')}
        // onClick={onClick}
      >
        {title}
      </chakra.p>
      <chakra.div role="group" hidden={!toggle} mt="16px" mx="-3">
        {children}
      </chakra.div>
    </chakra.div>
  );
}

const StyledLink = React.forwardRef(function StyledLink(props, ref) {
  const { isActive, ...rest } = props;

  return (
    <chakra.a
      aria-current={isActive ? 'page' : undefined}
      width="100%"
      px="3"
      py="1"
      rounded="md"
      ref={ref}
      fontSize="sm"
      fontWeight="500"
      color={useColorModeValue('gray.700', 'whiteAlpha.900')}
      transition="all 0.2s"
      _activeLink={{
        bg: useColorModeValue('teal.50', 'rgba(48, 140, 122, 0.3)'),
        color: useColorModeValue('teal.700', 'teal.200'),
        fontWeight: '600',
      }}
      {...rest}
    />
  );
});

const SidebarLink = (props) => {
  const { href, icon, children, ...rest } = props;

  const { pathname } = useRouter();
  const isActive = pathname === href;

  return (
    <chakra.div
      userSelect="none"
      display="flex"
      alignItems="center"
      lineHeight="1.5rem"
      {...rest}
    >
      <NextLink href={href} passHref>
        <StyledLink isActive={isActive}>{children}</StyledLink>
      </NextLink>
    </chakra.div>
  );
};

export function SidebarContent(props) {
  const { routes = [], pathname, contentRef } = props;
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <React.Fragment key={idx}>
            {lvl1.heading && (
              <chakra.h4
                fontSize="sm"
                fontWeight="bold"
                my="1.25rem"
                textTransform="uppercase"
                letterSpacing="wider"
                color={useColorModeValue('gray.700', 'inherit')}
              >
                {lvl1.title}
              </chakra.h4>
            )}
            {lvl1?.routes?.map((lvl2, index) => {
              if (!lvl2.routes) {
                return (
                  <SidebarLink ml="-3" mt="2" key={lvl2.path} href={lvl2.path}>
                    {lvl2.title}
                  </SidebarLink>
                );
              }

              const selected = pathname.startsWith(lvl2.path);
              const opened = selected || lvl2.open;

              const sortedRoutes = !!lvl2.sort
                ? _.sortBy(lvl2.routes, (i) => i.title)
                : lvl2.routes;

              return (
                <SidebarCategory
                  contentRef={contentRef}
                  key={lvl2.path + index}
                  title={lvl2.title}
                  selected={selected}
                  opened={opened}
                >
                  <Stack as="ul">
                    {sortedRoutes.map((lvl3) => (
                      <SidebarLink as="li" key={lvl3.path} href={lvl3.path}>
                        <span>{lvl3.title}</span>
                        {lvl3.new && (
                          <Badge
                            ml="2"
                            lineHeight="tall"
                            fontSize="10px"
                            variant="solid"
                            colorScheme="purple"
                          >
                            New
                          </Badge>
                        )}
                      </SidebarLink>
                    ))}
                  </Stack>
                </SidebarCategory>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter();
  const ref = React.useRef(null);

  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: 'contain',
      }}
      top="6.5rem"
      w="280px"
      h="calc(((100vh - 1.5rem) - 64px) - 42px);"
      pr="8"
      pb="8"
      pl="3"
      pt="8"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  );
};

export default Sidebar;
