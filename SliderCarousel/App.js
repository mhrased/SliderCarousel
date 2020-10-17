import React, { useState, useEffect } from 'react'
import { FlatList, Text, View, Dimensions, Image, Animated} from 'react-native'

const wt = Dimensions.get("window").width
const ht = Dimensions.get("window").height

let flatList

function infiniteScroll(dataList){
    const numberOfData = (dataList.length - 1)
    let scrollValue = 0, scrolled = 0

    setInterval(function() {
        scrolled ++
        if(scrolled < numberOfData)
        scrollValue = scrollValue + (ITEM_WIDTH + 20)

        else{
            scrollValue = 0
            scrolled = 0
        }

        this.flatList.scrollToOffset({ animated: true, offset: scrollValue})
        
    }, 1500)
}

const ITEM_WIDTH = (wt * 0.72)
const ITEM_HEIGHT = (ht / 4)
export default function App () {
  const state = {
    slider: [
      {
        key : 'left-spacer'
      },
      {
          title: 'Beautiful and dramatic Antelope Canyon',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/UYiroysl.jpg'
      },
      {
          title: 'Earlier this morning, NYC',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
      },
      {
          title: 'White Pocket Sunset',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
          illustration: 'https://i.imgur.com/MABUbpDl.jpg'
      },
      {
          title: 'Acrocorinth, Greece',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
      },
      {
          title: 'The lone tree, majestic landscape of New Zealand',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
      },
      {
          title: 'Middle Earth, Germany',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/lceHsT6l.jpg'
      },
      {
        key : 'right-spacer'
      }
  ]
  }

  const scrollX = React.useRef(new Animated.Value(0)).current;
  // let position = Animated.divide(scrollX, width)
  const [dataList, setDataList] = useState(state.slider)

  useEffect(()=> {
      setDataList(state.slider)
      infiniteScroll(dataList)
  })

  

  // render() {
    return (
      <View style={{flex:1}}>
        <View>
        <Animated.FlatList
            ref = {(flatList) => {this.flatList = flatList}}
            horizontal
            snapToInterval={(ITEM_WIDTH + 20)}
            decelerationRate={0}
            bounces={false}
            keyExtractor={({item,index}) => item.index.toString() }
            onScroll={Animated.event(
              [{nativeEvent : { contentOffset :{x : scrollX}}}],
              {useNativeDriver : true}
            )}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={state.slider}
            renderItem={(item) => {
              if(!item.item.title){
                return (
                  // <View style={{width: (ITEM_WIDTH / 6)}} />
                  <View key={item.item.title} style={{backgroundColor: '#eee',height:ITEM_HEIGHT, width:(ITEM_WIDTH / 8),marginRight:item.item.key == 'left-spacer' ? 10 : 0,marginLeft:item.item.key == 'left-spacer' ? 0 : 10,marginTop:50, justifyContent:'center', paddingHorizontal:20, opacity:.5,transform:[{scaleY:.8}]}}>
                    <Image style={{width : (ITEM_WIDTH / 8), height: ITEM_HEIGHT, resizeMode:'cover', position:'absolute',top:0, left:0, backgroundColor: 'rgba(0,0,0,0.4)', borderTopRightRadius: item.item.key == 'left-spacer' ? 10 : 0, borderBottomRightRadius:item.item.key == 'left-spacer' ? 10 : 0,borderTopLeftRadius:item.item.key == 'left-spacer' ? 0 : 10, borderBottomLeftRadius:item.item.key == 'left-spacer' ? 0 : 10}} source={{uri : item.item.key == 'left-spacer' ? 'https://i.imgur.com/lceHsT6l.jpg' : 'https://i.imgur.com/UYiroysl.jpg'}} />
                    <Text style={{color:'#FFF'}}></Text>
                  </View>
                )
              }
              const inputRange = [
                (item.index - 2) * ITEM_WIDTH,
                (item.index -1) * ITEM_WIDTH,
                (item.index) * ITEM_WIDTH,
              ]
              const scaleY = scrollX.interpolate({
                inputRange,
                outputRange : [.8, 1, .8]
              })
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange : [.5, 1, .5]
              })
              return <Animated.View key={item.item.title} style={{backgroundColor: '#eee',height:ITEM_HEIGHT, width:ITEM_WIDTH,marginHorizontal:10,marginTop:50, justifyContent:'center', paddingHorizontal:20, opacity, transform:[{scaleY}]}}>
                <Image style={{width : ITEM_WIDTH, height: ITEM_HEIGHT, resizeMode:'cover', position:'absolute',top:0, left:0, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius:10}} source={{uri : item.item.illustration}} />
                <Text style={{color:'#FFF'}}>{item.item.title}</Text>
              </Animated.View>
            }}
            keyExtractor={(item) => item.id} />
        </View>


        {/* <View style={{marginVertical:30, alignItems:'center'}}>
        <Animated.FlatList
            horizontal
            snapToInterval={(ITEM_WIDTH + 20)}
            decelerationRate={0}
            bounces={false}
            keyExtractor={({item,index}) => item.index.toString() }
            onScroll={Animated.event(
              [{nativeEvent : { contentOffset :{x : scrollX}}}],
              {useNativeDriver : true}
            )}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={state.slider}
            renderItem={(item) => {
              if(!item.item.title){
                return null
              }
              const inputRange = [
                (item.index - 4) * ITEM_WIDTH,
                (item.index - 3) * ITEM_WIDTH,
                (item.index - 2) * ITEM_WIDTH,

                (item.index - 1) * ITEM_WIDTH,

                (item.index) * ITEM_WIDTH,
                (item.index + 1) * ITEM_WIDTH,
                (item.index + 2) * ITEM_WIDTH,
              ]

              const scale = scrollX.interpolate({
                inputRange,
                outputRange : [.7,.7,.7, 1, .7,.7,.7]
              })
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange : [.5,.5,.5, 1, .5,.5,.5]
              })
              
              return <Animated.View style={{opacity,width:10, height:10,marginHorizontal:4, borderRadius:100, backgroundColor: '#333',transform:[{scale}]}} />
            }}
            keyExtractor={(item) => item.id} />
        </View> */}

        
      </View>
    )
  // }
}