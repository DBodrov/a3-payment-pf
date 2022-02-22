import styled from '@emotion/styled';

export const InfoSection = styled.article`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  padding-top: 4rem;

  @media (max-width: 600px) {
    padding-top: 1rem;
  }
`;

export const PayDetailsTable = styled.div`
  display: grid;
  grid-template: 2rem 2rem / 10rem 1fr;
  padding: 1rem 0;
`;
