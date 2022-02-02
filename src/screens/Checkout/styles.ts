import styled from '@emotion/styled';

export const Details = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 425px) {
    flex-flow: column nowrap;
  }

  width: 100%;
  height: 100%;
  gap: 4px;
  padding-top: 1rem;
  place-items: center flex-start;
`;

export const DetailCell = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 4px;
`;

export const DetailBlock = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  flex: 70%;
  gap: 8px;
  padding: 0 0.5rem;
`;
