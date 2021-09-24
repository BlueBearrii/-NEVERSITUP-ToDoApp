import { connect } from 'react-redux';
import styled from 'styled-components';
import TodoDashboard from './components/app/TodoDashboard';
import Authentication from './components/authentication/Authentication';

import './App.css'

function App({ authentication }) {

  console.log(authentication)
  return (
    <AppContainer>
      {authentication.token ? <TodoDashboard /> : <Authentication />}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;

  max-width: 600px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App);
