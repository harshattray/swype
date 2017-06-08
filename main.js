import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Stash from './src/Stash';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247_960_720.jpg' },
  { id: 2, text: 'Card #2', uri: 'https://cdn.pixabay.com/photo/2014/02/12/16/34/sky-264778_960_720.jpg' },
  { id: 3, text: 'Card #3', uri: 'https://cdn.pixabay.com/photo/2014/10/15/06/09/lake-489289_960_720.jpg' },
  { id: 4, text: 'Card #4', uri: 'https://cdn.pixabay.com/photo/2016/08/13/18/34/lake-tahoe-1591339_960_720.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

class App extends React.Component {
   renderCard(item) {
     return (
       <Card key={item.id}
         title={item.text}
         image={{ uri: item.uri }}
       >
       <Text style={{ marginBottom: 10 }}>Feed comes here</Text>
       <Button icon={{ name: 'rowing' }} backgroundColor='#ffa419' title="Explore" />
       </Card>
     );
   }
   renderNoMoreCards(){
     return(
       <Card title="Jig's up!!">
         <Text style={{ marginBottom: 10}}>
           Nothing left to swipe
         </Text>
         <Button backgroundColor="#03A9F4" title="Get more"></Button>
       </Card>
     );
   }

  render() {
    return (
      <View style={styles.container}>
        <Stash data={DATA} renderCard={this.renderCard} renderNoMoreCards ={this.renderNoMoreCards} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Expo.registerRootComponent(App);
