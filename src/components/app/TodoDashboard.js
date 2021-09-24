import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getAll, root } from '../../utils/api'
import { primaryColor, secondaryColor } from '../../utils/themes'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Popup from '../../utils/Popup'



function TodoDashboard({ authentication, logout }) {
    const inputTitleRef = useRef()
    const inputDescriptionRef = useRef()
    const config = { headers: { Authorization: `Bearer ${authentication.token}` } }

    const [todo, setTodo] = useState([])
    const fetctApi = async () => {
        var data = await axios.get(root + getAll, config)
        setTodo(data.data)

        console.log(data.data)
    }
    useEffect(() => {
        fetctApi()
    }, [])


    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState()
    const [_delete, setDelete] = useState(false)
    const [_deleteId, setDeleteId] = useState(false)


    const addData = async () => {
        const postData = {
            title: inputTitleRef.current.value,
            description: inputDescriptionRef.current.value
        }
        await axios.post(root + getAll, postData, config).then(data => {
            fetctApi()
            inputTitleRef.current.value = ""
            inputDescriptionRef.current.value = ""
        })
    }

    const updateData = async () => {
        const postData = {
            title: inputTitleRef.current.value,
            description: inputDescriptionRef.current.value
        }
        await axios.put(root + getAll + editId, postData, config).then(data => {
            fetctApi()
            inputTitleRef.current.value = ""
            inputDescriptionRef.current.value = ""
            setEditId(null)
            setEdit(!edit)
        })
    }

    const deleteData = (_id) => {
        setDeleteId(_id)
        setDelete(true)
    }

    const setUpdateData = (title, description, _id) => {
        inputTitleRef.current.value = title
        inputDescriptionRef.current.value = description
        setEditId(_id)
        setEdit(!edit)
    }

    const cancelEdit = () => {
        inputTitleRef.current.value = ""
        inputDescriptionRef.current.value = ""
        setEditId(null)
        setEdit(!edit)
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        edit ? updateData() : addData()
    }

    return (
        <Container>
            Welcome to Todo Dashboard

            <FormInput onSubmit={(e) => onSubmitForm(e)}>
                <Input placeholder="Enter Title" ref={inputTitleRef} required />
                <Input placeholder="Enter Description" ref={inputDescriptionRef} required />
                <Button type="submit">{edit ? "Update" : "Post"}</Button>
                {edit ? <CancelButton type="button" onClick={() => cancelEdit()}>Cancel</CancelButton> : null}
            </FormInput>

            <Card>
                {todo ? todo.map(data => {
                    return (
                        <CardContainer key={data._id}>
                            <InDetails>
                                <Text>Title : {data.title}</Text>
                                <Text>Desctiption : {data.description}</Text>
                            </InDetails>
                            <Tools>
                                <Tool><FontAwesomeIcon icon={faPencilAlt} onClick={() => setUpdateData(data.title, data.description, data._id)} color={secondaryColor} /></Tool>
                                <Tool><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteData(data._id)} color={secondaryColor} /></Tool>
                            </Tools>
                        </CardContainer>
                    )
                }) : null}
            </Card>

            <Logout onClick={() => logout()} >Logout</Logout>
            {_delete ? <Popup id={_deleteId} config={config} setDelete={setDelete} fetctApi={fetctApi} /> : null}
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

    flex-direction: column;

`

const Logout = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
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

const Card = styled.div`
    width: 100%;
    padding: 5px 10px;
    margin-top: 10px;
    max-height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;

`

const CardContainer = styled.div`
    margin: 10px 0px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #e7e7e7;
    outline-color: ${primaryColor};
    display: flex;
    flex-direction: row;
`

const InDetails = styled.div`
    flex: 2;
    padding: 0 10px;
`

const Text = styled.p`
    color: #666666;
`

const Tools = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Tool = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-radius: 10px;
    border: 0px;
    background-color: ${primaryColor};
    color: #FFFFFF;
    cursor: pointer;

    &:hover {
        background-color: ${secondaryColor};
    }
`

const CancelButton = styled.button`
    width: 100%;
    height: 40px;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid #666666;
    background-color: #FFFFFF;
    color: #666666;
    cursor: pointer;
`

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: "REMOVE_TOKEN" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoDashboard)

