import React from 'react';

interface SectionProps {
  Tag?: string;
  pageTop?: boolean;
  bg?: string | false;
  padding?: boolean;
  paddingTop?: boolean;
  paddingBottom?: boolean;
  center?: boolean;
  children?: React.ReactNode;
  marginTop?: boolean;
  className?: string | null;
}

declare const Section: React.ForwardRefExoticComponent<
  SectionProps & React.RefAttributes<any>
>;

export default Section;
