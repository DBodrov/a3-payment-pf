import styled from '@emotion/styled';

export const ApplepayButton = styled.button`
  display: inline-block;
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: plain; /* Use any supported button type. */
  width: 200px;
  height: 48px;
  cursor: pointer;
`;

export const Section = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
`;
