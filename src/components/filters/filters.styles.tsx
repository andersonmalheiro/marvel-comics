import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: auto;
  gap: 1em;
`;

export const FieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
  margin: 0;
`;

export const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 12px 18px;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  background: #fff;

  &::placeholder {
    color: #999;
  }
`;

export const Select = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 12px 18px;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;

  & option {
    padding: 10px;
    color: #000;
  }
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;
