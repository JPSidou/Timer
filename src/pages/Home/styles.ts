import styled from "styled-components";

export const HomeContainer = styled.main`
    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${(props) => props.theme["gray-100"]};
    font-size: 1.25rem;
    font-weight: bold;
    flex-wrap: wrap;
`;

const BaseInupt = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
    font-size: 1.125rem;
    font-weight: bold;
    padding: 0 0.5rem;
    color: ${(props) => props.theme["gray-100"]};

    &::placeholder{
        color: ${(props) => props.theme["gray-500"]};
    }
    &:focus{
        box-shadow: none;
        border-color: ${(props) => props.theme["green-500"]};
    }
`

export const TaskInput = styled(BaseInupt)`
    flex: 1;
    &::-webkit-calendar-picker-indicator{
        display: none !important;
    }
`

export const MinutesAmountInput = styled(BaseInupt)`
    width: 4rem;
`

export const CountdownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${(props) => props.theme["gray-100"]};

    display: flex;
    gap: 1rem;
    
    span{
        background: ${(props) => props.theme["gray-700"]};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`;

export const Separator = styled.div`
    font-family: monospace;
    padding: 2rem 0;
    color: ${(props) => props.theme["green-500"]};
    
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const BaseCountDownButton = styled.button`
    width: 100%;
    border: 0; 
    border-radius: 8px;
    padding: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;    

    gap: 0.5rem;
    font-weight: bold;

    cursor: pointer;

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }

`
export const StartCountDownButton = styled(BaseCountDownButton)`
    background: ${(props) => props.theme["green-500"]};
    color: ${(props) => props.theme["gray-100"]};

    &:not(:disabled):hover{
        background: ${(props) => props.theme["green-700"]};
    }
`

export const StopCountDownButton = styled(BaseCountDownButton)`
    background: ${(props) => props.theme["red-500"]};
    color: ${(props) => props.theme["gray-100"]};

    &:not(:disabled):hover{
        background: ${(props) => props.theme["red-700"]};
    }
`