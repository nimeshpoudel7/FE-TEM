import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export const CollapsibleComponent = ({ items = [] }) => {
  return (
    <Accordion>
      {items.map((eachItem, index) => (
        <AccordionItem key={eachItem?.key}>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {eachItem.title ?? ""}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{eachItem.body ?? ""}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
