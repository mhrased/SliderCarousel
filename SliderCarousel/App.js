import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import CarouselItem from './CarouselItem'

const wt = Dimensions.get("window").width
const ht = Dimensions.get("window").height

export default class App extends Component {
  state = {
    sliderData : [{key:'left-spacer'},{title:'Beautiful and dramatic Antelope Canyon',subtitle:'Lorem ipsum dolor sit amet et nuncat mergitur',illustration:'https://i.imgur.com/UYiroysl.jpg'},{title:'Earlier this morning, NYC',subtitle:'Lorem ipsum dolor sit amet',illustration:'https://i.imgur.com/UPrs1EWl.jpg'},{title:'White Pocket Sunset',subtitle:'Lorem ipsum dolor sit amet et nuncat ',illustration:'https://i.imgur.com/MABUbpDl.jpg'},{title:'Acrocorinth, Greece',subtitle:'Lorem ipsum dolor sit amet et nuncat mergitur',illustration:'https://i.imgur.com/KZsmUi2l.jpg'},{title:'The lone tree, majestic landscape of New Zealand',subtitle:'Lorem ipsum dolor sit amet',illustration:'https://i.imgur.com/2nCt3Sbl.jpg'},{title:'Middle Earth, Germany',subtitle:'Lorem ipsum dolor sit amet',illustration:'https://i.imgur.com/lceHsT6l.jpg'},{key:'right-spacer'}],

  }

  render() {
    return (
      <View style={{flex:1}}>
        <CarouselItem 
          data={this.state.sliderData}
          bgColor={null}
          paddingContainer={20}
          item_width={(wt * 0.68)}
          item_border={6}
          outputScaleY={[.9, 1, .9]}
          outputOpacity={[.5, 1, .5]}
          dot_margin={15}
          spacer={61}
          delay={3500}
          item_font={17}
          justifyText={'center'}
          alignText={'center'}
          item_height={((wt * 0.68) * .65)} />
      </View>
    )
  }
}
