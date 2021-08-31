// Vendor
import React, { useCallback } from "react";
import styled from "@emotion/styled";
// import { Field, useFormikContext } from 'formik';
// import { useMediaQuery } from 'react-responsive';
import { Carousel } from "react-responsive-carousel";

// Local
import Sebastian from "../../Sebastian";
import { QuestionWrapper, InputGroupWrapper, Title, Description } from "./Questions.styles";

export const ColorizedFinance = styled(Finance)`
  ${"" /* transform: scale(2); */}
  & svg {
    width: 5rem;
    height: 5rem;
  }
  & svg g path:first-child {
    fill: ${(props) => props.theme.carvana.blue.medium};
  }
`;

export const ColorizedCalendar = styled(CalendarDates)`
  ${"" /* transform: scale(2); */}
  & svg {
    width: 5rem;
    height: 5rem;
  }
  & svg g path:first-child {
    fill: ${(props) => props.theme.carvana.blue.medium};
  }
`;

export const ColorizedLoan = styled(LoanCalculator)`
  ${"" /* transform: scale(2); */}
  & svg {
    width: 5rem;
    height: 5rem;
  }
  & svg g path:first-child {
    fill: ${(props) => props.theme.carvana.blue.medium};
  }
`;

export const ColorizedCart = styled(Cart)`
  ${"" /* transform: scale(2); */}
  & svg {
    width: 5rem;
    height: 5rem;
  }
  & svg g path:first-child {
    fill: ${(props) => props.theme.carvana.blue.medium};
  }
`;

const partnerName = "Credit Karma";

export const GetPreQualified = () => {
  // const { errors, touched } = useFormikContext();

  const speechMarkup = useCallback(() => {
    return {
      __html: `Welcome from <strong>${partnerName}</strong>!<br /> Get pre-qualified for a loan ✨with no risk to your credit score.`
    };
  });

  return (
    <QuestionWrapper>
      <Sebastian speech={speechMarkup()} />
      <InputGroupWrapper>
        <Carousel
          autoPlay
          swipeable
          infiniteLoop
          showArrows={false}
          showStatus={false}
          showThumbs={false}>
          <div>
            <ColorizedFinance />
            <Title>Zero Risk</Title>
            <Description>Carvana offers no risk to your credit prequalification.</Description>
          </div>
          <div>
            <ColorizedCalendar />
            <Title>Over A Month To Decide</Title>
            <Description>Real terms that are valid for 45 days.</Description>
          </div>
          <div>
            <ColorizedLoan />
            <Title>Customizable Terms</Title>
            <Description>Structure the loan the way you want.</Description>
          </div>
          <div>
            <ColorizedCart />
            <Title>Never Leave The House</Title>
            <Description>No need to go to the bank or the dealership.</Description>
          </div>
        </Carousel>
      </InputGroupWrapper>
    </QuestionWrapper>
  );
};
