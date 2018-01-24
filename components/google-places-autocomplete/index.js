import styled from 'styled-components/native'
import React, {Component} from 'react'
import {
  Text
} from 'react-native'

const Input = styled.TextInput`
  background-color: #BDBDBD;
  width: 80%;
  font-size: 18px;
`
const Wrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ResultList = styled.FlatList`

`

class GooglePlacesAutocomplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      textValue: '',
      data: []
    }
    this.onChangeText = this.onChangeText.bind(this)
  }
  render () {
    const {
      data
    } = this.state
    return (
      <Wrapper>
        <Text>{this.state.textValue}</Text>
        <Input
          onChangeText={this.onChangeText}
          autoCorrect={false}
        />
        <ResultList
          data={data}
          renderItem={this._renderListItems}
        />
      </Wrapper>
    )
  }
  _renderListItems ({item}) {
    return <Text>{item.description}</Text>
  }
  async onChangeText (text) {
    const {
      apiKey
    } = this.props
    this.setState({textValue: text})
    var response = await fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+text+'&key='+apiKey)
    response = await response.json()
    // console.log(response)
    this.setState({data: response.predictions})
  }
}

export default GooglePlacesAutocomplete
