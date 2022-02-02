import styled from '@emotion/styled';

export const Page = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 704px;
  height: 100%;
  background-color: transparent;
  padding: 1rem;

  @media (max-width: 375px) {
    padding: 0.5rem;
  }
`;

export const ViewCard = styled.article`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  max-width: 704px;
  min-height: 10rem;
  padding: 1.5rem;
  @media (max-width: 425px) {
    padding: 0.5rem;
  }
  background-color: var(--color-background);
  box-shadow: 0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32);
  border-radius: 6px;
`;

export const Screen = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;
`
