import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { root, getAll } from './api'
import { primaryColor, secondaryColor } from './themes'

export default function Popup(props) {

    const requestDeleteData = async () => {
        await axios.delete(root + getAll + props.id , props.config).then(data => {
            props.fetctApi()
            props.setDelete(false)
        })
    }

    return (
        <Container>
            <Card>
                <p>Confirm to delete ?</p>

                <RowButton>
                    <ConfirmButton onClick={() => requestDeleteData()}>
                        Confirm
                    </ConfirmButton>
                    <CancelButton onClick={() => props.setDelete(false)}>
                        Cancel
                    </CancelButton>
                </RowButton>
            </Card>
        </Container>
    )
}

const Container = styled.div`
    background-color: rgba(0,0,0,0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Card = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    flex-direction: column; 
    padding: 20px;
    border-radius: 10px;
    
`

const RowButton = styled.div`
    width: 100% ;
    display: flex;
    flex-direction: row;
`

const ConfirmButton = styled.button`
    flex: 1;
    background-color: ${primaryColor};
    color: #FFFFFF;
    border: 0;
    border-radius: 10px;
    padding: 10px 15px;
    cursor: pointer;

    &:hover {
        background-color: ${secondaryColor};
    }
`

const CancelButton = styled.button`
    flex: 1;
    background-color: transparent;
    border: 0;
    border-radius: 10px;
    padding: 10px 15px;
    cursor: pointer;
`
