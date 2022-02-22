import styled from '@emotion/styled';

export const StyledPage = styled.section`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const StatusBlock = styled.article`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background-color: var(--color-background-secondary);
  border-radius: 1rem;
  width: 70%;
  height: 20rem;
  padding: 5rem 1rem 3rem;

  @media (max-width: 600px) {
    width: 90%;
    height: auto;
  }
`;
