import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  max-width: 704px;
  height: 100%;
  position: relative;
`;

const Card = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 450px;
  width: 100%;
  height: 280px;
  border-radius: 6px;
  background-color: #f2f6fb;
  @media (max-width: 450px) {
    padding: 1rem;
  }
  padding: 2rem;
`;

export const CardsGroup = styled.div`
  position: relative;
  width: 100%;
  @media (max-width: 704px) {
    height: calc(280px + 200px); /* FrontCard height + BackCard top */
  }
  height: calc(280px + 80px);
`;

export const FrontCard = styled(Card)`
  position: absolute;
  left: 0;
  top: 30px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const BackCard = styled(Card)`
  position: absolute;
  right: 0;
  padding: 20px 0;
  @media (max-width: 704px) {
    top: 200px;
  }
  top: 80px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: 425px) {
    padding: 1rem 0.5rem;
  }
  padding: 1rem 30px;
`;

export const CSCField = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  /* padding-top: calc(3rem + 32px); */
  padding: calc(3rem + 36px) 20px 0;
`;

export const FormField = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 24px;
  width: 100%;
`;

export const Label = styled.label`
  font: normal 400 14px/20px 'Source Sans Pro';
  color: var(--color-text-label);
  margin-bottom: 8px;
`;
