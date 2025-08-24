import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import { useState } from "react";

function Accordian() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-14 h-fit w-full bg-yellow-200 dark:!bg-navy-800">
      <Accordion
        className="bg-white dark:!bg-navy-800"
        defaultIndex={[0]}
        allowMultipleExpanded={true}
        allowZeroExpanded={true}
      >
        <AccordionItem className="bg-white dark:!bg-navy-800">
          <AccordionItemHeading
            className="pr-6"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <AccordionItemButton className="flex items-center justify-between border-b border-gray-200 py-[17px] dark:!border-white/10">
              <p className="font-bold text-navy-700 dark:text-white">
                Description
              </p>
              {open ? (
                <MdKeyboardArrowDown className="text-lg text-gray-600" />
              ) : (
                <MdKeyboardArrowUp className="text-lg text-gray-600" />
              )}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className="text-medium text-gray-600">
              ZOE™ is a simple and understated stackable shell chair with lots
              of personality and character that is as beautiful when seen from
              below as from above. The frame is discretely tucked into the
              chair's molded shell, and the shell's tapering thickness gives it
              a friendly expression.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem className="bg-white dark:!bg-navy-800">
          <AccordionItemHeading
            className="pr-6"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <AccordionItemButton className="flex justify-between border-b border-gray-200 py-[17px] dark:!border-white/10">
              <p className="font-bold text-navy-700 dark:text-white">
                Characteristics{" "}
              </p>
              {open ? (
                <MdKeyboardArrowDown className="text-lg text-gray-600" />
              ) : (
                <MdKeyboardArrowUp className="text-lg text-gray-600" />
              )}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className="text-medium text-gray-600">
              ZOE™ is a simple and understated stackable shell chair with lots
              of personality and character that is as beautiful when seen from
              below as from above. The frame is discretely tucked into the
              chair's molded shell, and the shell's tapering thickness gives it
              a friendly expression.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
        <AccordionItem className="bg-white dark:!bg-navy-800">
          <AccordionItemHeading
            className="pr-6"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <AccordionItemButton className="flex justify-between border-b border-gray-200 py-[17px] dark:!border-white/10">
              <p className="font-bold text-navy-700 dark:text-white">Reviews</p>
              {open ? (
                <MdKeyboardArrowDown className="text-lg text-gray-600" />
              ) : (
                <MdKeyboardArrowUp className="text-lg text-gray-600" />
              )}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p className="text-medium text-gray-600">
              ZOE™ is a simple and understated stackable shell chair with lots
              of personality and character that is as beautiful when seen from
              below as from above. The frame is discretely tucked into the
              chair's molded shell, and the shell's tapering thickness gives it
              a friendly expression.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Accordian;
