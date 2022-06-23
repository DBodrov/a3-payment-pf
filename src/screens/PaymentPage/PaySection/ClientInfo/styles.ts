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

export const Label = styled.label`
  font: normal 400 14px/20px 'Source Sans Pro';
  color: var(--color-text-label);
  margin-bottom: 8px;
`;

export const FormField = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 24px;
  width: 100%;
`;

export const InfoButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  outline: 0;
  background: none;
  cursor: pointer;
`;
