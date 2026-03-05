/**
 * Layout Components (re-exported from Panda CSS)
 *
 * Usage:
 *   import { Flex, Grid, HStack, VStack } from "@/components/layout";
 *
 *   <Flex gap="md" align="center">...</Flex>
 *   <Grid columns={3} gap="lg">...</Grid>
 *   <HStack gap="sm">...</HStack>
 *   <VStack gap="md">...</VStack>
 */

// Flexbox
export { Flex, type FlexProps } from "styled-system/jsx/flex";
export { HStack, type HstackProps } from "styled-system/jsx/hstack";
export { VStack, type VstackProps } from "styled-system/jsx/vstack";
export { Stack, type StackProps } from "styled-system/jsx/stack";
export { Wrap, type WrapProps } from "styled-system/jsx/wrap";

// Grid
export { Grid, type GridProps } from "styled-system/jsx/grid";
export { GridItem, type GridItemProps } from "styled-system/jsx/grid-item";

// Utility
export { Box, type BoxProps } from "styled-system/jsx/box";
export { Center, type CenterProps } from "styled-system/jsx/center";
export { Container, type ContainerProps } from "styled-system/jsx/container";
export { Spacer, type SpacerProps } from "styled-system/jsx/spacer";
export { Divider, type DividerProps } from "styled-system/jsx/divider";
