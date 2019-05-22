<template>
    <div class="row" v-if="gifs.length !== 0">
        {{searchText}}
        <div class="column" v-for="gif in gifs" :key="gif.id">
            <img alt="Vue logo" :src="gif.images.fixed_height.url" class="img-responsive">

        </div>
    </div>  
</template>

<script>
import $ from '../../node_modules/jquery/dist/jquery.min.js'
import debounce from 'lodash.debounce'
import InfiniteScroll from 'infinite-scroll'

export default {
  name: 'random-gifs',
  data() {
    return {
        gifs: [],
        debouncedRandom: null,
        pagination: null,
        gifsCount: null,
        searchText: null
    }
  },
  methods: {
    getRandomGifs: function() {
        var vm = this;
        $.get( "https://api.giphy.com/v1/gifs/trending?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&limit=24&rating=G", function( res ) {
          vm.gifs = res.data;
          vm.pagination = res.pagination;
          vm.gifsCount = res.pagination.count;
        });
    }
  },
  mounted: function() {
    this.getRandomGifs();
    this.debouncedRandom = debounce(this.getRandomGifs, 1000);

    var vm = this;
    var infScroll = new InfiniteScroll( '.container', {
        path: function() {
            return `https://api.giphy.com/v1/gifs/trending?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&limit=24&rating=G&offset=${vm.gifsCount}`;
        },      
        responseType: 'text',
        history: false
    });
    
    infScroll.on( 'load', function( response ) {        
      var data = JSON.parse( response );
      vm.gifs = [...vm.gifs, ...data.data];
      vm.gifsCount += data.pagination.count;
    });
  }
}
</script>
