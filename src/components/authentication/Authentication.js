import axios from 'axios'
import React from 'react'
import styled from 'styled-components'

import { primaryColor } from "../../utils/themes"
import { root, login } from '../../utils/api'
import { connect } from 'react-redux'
import store from '../../redux/store/store'
import { getToken } from '../../redux/reducers/authentication'

function Authentication({ authentication}) {

    const onSubmitForm = async (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const password = e.target[1].value

        var data = await axios.post(root + login, { username, password })

        console.log(data)

        if(data.status === 200) {
            authentication(data)
            console.log(store.getState())
        }

}

return (
    <Container>
        <FormInput onSubmit={(e) => onSubmitForm(e)}>
            <Input type="text" placeholder="Username" required />
            <Input type="password" placeholder="Password" required />
            <Button type="submit">Login</Button>
        </FormInput>
    </Container>
)
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e7e7e7;
    width: 100%;
    padding: 20px;
    border-radius: 10px;

    -webkit-box-shadow: 0px 0px 9px 4px rgba(0,0,0,0.06); 
    box-shadow: 0px 0px 9px 4px rgba(0,0,0,0.06);

`

const FormInput = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Input = styled.input`
    height: 40px;
    margin: 5px 0;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid #e7e7e7;
    outline-color: ${primaryColor};
`

const Button = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-radius: 10px;
    border: 0px;
    background-color: ${primaryColor};
    color: #FFFFFF;
`

const mapDispatchToProps = (dispatch) => {
    return {
        authentication: (data) => dispatch(getToken(data))
    }
}

export default connect(null, mapDispatchToProps)(Authentication)
