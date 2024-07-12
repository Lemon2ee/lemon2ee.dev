// components/CustomQuote.js
import React, {cloneElement, isValidElement, ReactNode} from 'react';
import {AlertIcon, BeakerIcon, InfoIcon, LightBulbIcon, ReportIcon} from "@primer/octicons-react";

type MessageType = '[!NOTE]' | '[!TIP]' | '[!IMPORTANT]' | '[!WARNING]' | '[!CAUTION]';

interface MessageStyle {
    borderClassName: string;
    textClassName: string;
    component: ReactNode;
}

// Define the message styles with both CSS and components
const messageStyles: Record<MessageType, MessageStyle> = {
    '[!NOTE]': {
        borderClassName: 'border-l-5 border-blue-500',
        textClassName: 'text-blue-500',
        component: <InfoIcon size={16} />,
    },
    '[!TIP]': {
        borderClassName: 'border-l-5 border-green-500',
        textClassName: 'text-green-500',
        component: <LightBulbIcon size={16} />,
    },
    '[!IMPORTANT]': {
        borderClassName: 'border-l-5 border-violet-400',
        textClassName: 'text-violet-400',
        component: <ReportIcon size={16} />,
    },
    '[!WARNING]': {
        borderClassName: 'border-l-5 border-orange-500',
        textClassName: 'text-orange-500',
        component: <AlertIcon size={16} />,
    },
    '[!CAUTION]': {
        borderClassName: 'border-l-5 border-red-500',
        textClassName: 'text-red-500',
        component: <BeakerIcon size={16} />,
    },
};

function extractAndCapitalize(text: any): string {
  // Use a regular expression to extract text within brackets
  const match = text.match(/\[!([^\]]+)\]/);

  if (match && match[1]) {
    const extractedText = match[1];

    // Capitalize the extracted text correctly
      return extractedText
        .toLowerCase()
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }

  return '';
}


const CustomQuote = ({children}: any) => {

    const messageType = children[1]?.props?.children[0]
    // @ts-ignore
    const { borderClassName, textClassName, component } = messageStyles[messageType];

    // Convert children to an array
    const childrenArray = React.Children.toArray(children);

    // Check if there is a second child
    if (childrenArray.length > 1) {
        const secondChild = childrenArray[1];

        if (isValidElement(secondChild) && secondChild.props?.children) {
            // Convert the second child's children to an array
            const nestedChildren = React.Children.toArray(secondChild.props.children);

            // Replace the first nested child of the second child with "text"
            if (nestedChildren.length > 0) {
                const originalText = nestedChildren[0];
                nestedChildren[0] = <span className={textClassName}>{component} <span className={"not-italic"}>{extractAndCapitalize(originalText)}</span></span>;
            }

            nestedChildren.splice(1, 0, <br/>);

            // Update the second child with the modified children
            childrenArray[1] = cloneElement(secondChild, {
                ...secondChild.props,
                children: nestedChildren,
            });
        }
    }


    return (
        <blockquote className={borderClassName}>
            {childrenArray}
        </blockquote>
    );
};

export default CustomQuote;
