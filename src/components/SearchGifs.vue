<template>
	<div class="search" v-on:search-change="searchText = $event">
		<div class="row" v-if="gifs.length !== 0">
	        <div class="column" v-for="gif in gifs" :key="gif.id">
	            <img alt="Vue logo" :src="gif.images.fixed_height.url" class="img-responsive">
	        </div>
	    </div>
	    <div class="row" v-if="pagination && pagination.count === 0">
	        <div class="column full-width">
	            <h1>No Gifs Found</h1>
	            <img src="https://media3.giphy.com/media/YyKPbc5OOTSQE/giphy.gif" alt="">
	        </div>
	    </div>
	</div>       
</template>

<script>
import $ from '../../node_modules/jquery/dist/jquery.min.js'
import debounce from 'lodash.debounce'
import InfiniteScroll from 'infinite-scroll'

export default {
  name: 'search-gifs',
  data() {
    return {
        searchText: '',
        gifs: [],
        debouncedSearch: null,
        pagination: null,
        gifsCount: null
    }
  },
  watch: {
    searchText: function(val) {
        // val === '' ? this.debouncedRandom() : this.searchDebounceGifs(); 
        this.searchDebounceGifs(); 
        if(val !== undefined) this.$router.push(`/search?q=${val}`);
    },
    '$route.query.q': {
        immediate: true,
        handler: function(val) {
            if(val !== undefined) {
                this.searchText = val;
            }
        }
    }
  },
  methods: {
  	searchDebounceGifs: function() {
        this.debouncedSearch();
    },
    searchGifs: function() {
        var vm = this;
        $.get({
            url: `https://api.giphy.com/v1/gifs/search?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&q=${vm.searchText}&limit=24&offset=0&rating=G&lang=en`,
            success: function( res ) {
              vm.gifs = res.data;
              vm.pagination = res.pagination;
              vm.gifsCount = res.pagination.count;
            }
        });
    }
  },
  mounted: function() {
  	this.debouncedSearch = debounce(this.searchGifs, 1000);

    var vm = this;
    var infScroll = new InfiniteScroll( '.container', {
        path: function() {
            if(vm.$route.query.q !== undefined && vm.$route.query.q !== '') {
                return `https://api.giphy.com/v1/gifs/search?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&q=${vm.searchText}&limit=24&offset=0&rating=G&lang=en&offset=${vm.gifsCount}`;
            }
            return null;
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

