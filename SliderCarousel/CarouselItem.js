import React, { Component } from 'react'
import { FlatList, Text, View, Dimensions, Image, Animated} from 'react-native'

const wt = Dimensions.get("window").width
const ht = Dimensions.get("window").height

let flatList1

const scrollX = new Animated.Value(0)

export default class CarouselItem extends Component {
    state = {
        currentItem : 1,
        scrollValue : 0,
    }

    componentDidMount = () =>{
        this.infinitScroll()
    }

    infinitScroll = ()=>{
        let datalength = this.props.data.length
        let scrollValue = this.state.scrollValue, scrolled = this.state.currentItem; 
        let {item_width, delay} = this.props

        setInterval(() => {
            scrolled++
            if(scrolled < (datalength - 1) ){
                this.setState({
                    scrollValue : scrollValue + (item_width + 20),
                    currentItem : scrolled
                })
                scrollValue  = scrollValue + (item_width + 20)
            }else{
                this.setState({
                    scrollValue : 0,
                    currentItem : 1
                })
                scrollValue = 0
                scrolled = 1
            }
            
            if(this.flatList1){
                this.flatList1.scrollToOffset({ animated: true, offset: scrollValue})
            }
        }, delay)
    }

    render() {
        if(this.props.data.length == 0){
            return null
        }else{
            let {bgColor,paddingContainer,item_border,item_width,item_height,dot_margin,outputScaleY,outputOpacity,spacer,item_font,justifyText,alignText} = this.props
            return (
                <View style={{backgroundColor: bgColor == null ? null : bgColor,paddingVertical:paddingContainer}}>
                    <View>
                        <Animated.FlatList
                            ref = {(flatList1)=>{this.flatList1 = flatList1}}
                            horizontal
                            snapToInterval={(item_width + 20)}
                            decelerationRate={0}
                            bounces={false}
                            onScroll={
                                Animated.event(
                                    [{nativeEvent : { contentOffset :{x : scrollX}}}],
                                    {useNativeDriver : true}
                                )
                            }
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            keyExtractor = {(item,index) => `${index}-slideItem`}
                            data={this.props.data}
                            renderItem={(item) => {
                                if(!item.item.title){
                                    return (
                                        <View key={item.item.title} style={{height:item_height, width:spacer,marginRight:item.item.key == 'left-spacer' ? 10 : 0,marginLeft:item.item.key == 'left-spacer' ? 0 : 10, justifyContent:'center', opacity:.5,transform:[{scaleY:.9}]}}>
                                            <Image style={{width : spacer, height: item_height, resizeMode:'cover', position:'absolute',top:0, left:0, backgroundColor: 'rgba(0,0,0,0.4)', borderTopRightRadius: item.item.key == 'left-spacer' ? item_border : 0, borderBottomRightRadius:item.item.key == 'left-spacer' ? item_border : 0,borderTopLeftRadius:item.item.key == 'left-spacer' ? 0 : item_border, borderBottomLeftRadius:item.item.key == 'left-spacer' ? 0 : item_border}} source={{uri : item.item.key == 'left-spacer' ? 'https://i.imgur.com/lceHsT6l.jpg' : 'https://i.imgur.com/UYiroysl.jpg'}} />
                                            <Text style={{color:'#FFF'}}></Text>
                                        </View>
                                    )
                                }

                                const inputRange = [
                                    (item.index - 2) * item_width,
                                    (item.index -1) * item_width,
                                    (item.index) * item_width,
                                ]
                                const scaleY = scrollX.interpolate({
                                    inputRange,
                                    outputRange : outputScaleY
                                })
                                const opacity = scrollX.interpolate({
                                    inputRange,
                                    outputRange : outputOpacity
                                })

                                return (
                                    <Animated.View key={item.item.title} style={{height:item_height, width:item_width,marginHorizontal:10, justifyContent:'center', paddingHorizontal:20, opacity,transform:[{scaleY}]}}>
                                        <Image style={{width : item_width, height: item_height, resizeMode:'cover', position:'absolute',top:0, left:0, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius:item_border}} source={{uri : item.item.illustration}} />
                                        <View style={{position: 'absolute',backgroundColor:'rgba(0,0,0,0.4)', top:0, left:0, width:item_width,height:item_height, borderRadius:item_border,justifyContent:justifyText, alignItems:alignText}}>
                                            <Text style={{color:'#FFF', fontSize:item_font}}>
                                                {item.item.title}
                                            </Text>
                                        </View>
                                    </Animated.View>
                                )
                                }} />
                    </View>

                    <View style={{alignItems:'center', marginTop:dot_margin}}>
                        <FlatList
                            horizontal
                            snapToInterval={(item_width + 20)}
                            decelerationRate={0}
                            bounces={false}
                            keyExtractor = {(item,index) => `${index}-pagination`}
                            showsHorizontalScrollIndicator={false}
                            scrollEventThrottle={16}
                            renderItem={(item) => {
                                if(item.item.title){
                                    return (
                                        <View style={{height:10, width:10, borderRadius : 5, backgroundColor: (item.index) == this.state.currentItem ? 'red' : '#eee',marginHorizontal:5}} />
                                    )
                                }
                            }}
                            data={this.props.data}
                            />
                    </View>
                </View>
            )
        }
    }
}