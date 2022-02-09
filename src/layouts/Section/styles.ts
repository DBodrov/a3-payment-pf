import styled from '@emotion/styled';

export const StyledSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 460px;
  height: 100%;
  padding: 3.75rem 3rem 0 1rem;
  margin-left: auto;

  @media (max-width: 768px) {
    padding: 2.5rem 0.5rem 0;
  }

`;
