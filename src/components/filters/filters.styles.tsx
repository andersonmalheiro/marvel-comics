import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  flex: 1;
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
