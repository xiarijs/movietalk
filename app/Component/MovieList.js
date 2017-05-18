import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import styles from '../style/main';

const REQUEST_MOVIES_URL = 'http://api.douban.com/v2/movie/top250';

class MovieList extends Component {
  constructor(props){
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (data1,data2) => data1 != data2
      }),
      loading: false
    }

    this.fetchData();
  }
  fetchData (){
    fetch(REQUEST_MOVIES_URL)
      .then(response=>response.json())
      .then(responseData=>{
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
          loading: true
        })
      })
      .done();
  }
  renderMovieList(movie){
    return (
      <TouchableHighlight
        underlayColor='rgba(34, 26, 38, 0.1)'
        onPress={()=>{console.log(`《${movie.title}》被点了。。。`)}}
      >
        <View style={styles.movieListRow}>
          <View>
            <Image
              style={styles.image}
              source={{uri:movie.images.large}}
            />
          </View>
          <View style={styles.movieListInf}>
            <Text style={styles.textTitle}>{movie.title}</Text>
            <Text style={styles.textAlias}>{movie.original_title} ( {movie.year} )</Text>
            <Text style={styles.textNum}>{movie.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render(){
    if(!this.state.loading){
      return (
        <View style={styles.container}>
          <View style={styles.loadBox}>
            <ActivityIndicator
              size='large'
              color='#6435c9'
            />
          </View>
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovieList}
        />
      </View>
    )
  }
}

export {MovieList as default}
