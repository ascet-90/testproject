<template>
  <div class="container">
    <div class="row top-row">
        <div class="column">
            <div class="logo">
                <a href="/"><span>LOGO</span></a>                
            </div>
        </div>
        <div class="column three-columns">
            <SearchBar v-on:search-change="searchText = $event" :onSubmit="searchGifs" :searchText="searchText"/>            
        </div>
    </div>
    <div class="row" v-if="gifs.length !== 0">
        <div class="column" v-for="gif in gifs" :key="gif.id">
            <Gif :gifData="gif"/>
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
import SearchBar from '@/components/SearchBar'
import Gif from '@/components/Gif'

export default {
  name: 'home',
  data() {
    return {
        searchText: '',
        gifs: [],
        pagination: null,
        debouncedSearch: null,
        debouncedRandom: null
    }
  },
  components: {
    SearchBar,
    Gif
  },
  computed: {
    gifsCount: function() {
        return this.gifs.length;
    }
  },
  methods: {
    getRandomGifs: function() {
        var vm = this;
        $.get( "https://api.giphy.com/v1/gifs/trending?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&limit=24&rating=G", function( res ) {
          vm.gifs = res.data;
          vm.pagination = res.pagination;
        });
    },
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
            }
        });
    }
  },
  watch: {
    searchText: function(val) {
        val === '' ? this.debouncedRandom() : this.searchDebounceGifs(); 
        if(val !== undefined) this.$router.push(`/search?q=${val}`);
    },
    '$route.query.q': {
        immediate: true,
        handler: function(val) {
            if(val !== undefined) {
                this.searchText = val;
            }
        }
    },
    '$route.path': function(val) {
        if(val === '/') {
            this.searchText = '';
        }
    }
  },
  mounted: function() {
    if(this.$route.query.q === undefined || this.$route.query.q === '') this.getRandomGifs();
    this.debouncedSearch = debounce(this.searchGifs, 1000);
    this.debouncedRandom = debounce(this.getRandomGifs, 1000);

    var vm = this;
    var infScroll = new InfiniteScroll( '.container', {
        path: function() {
            if(vm.$route.query.q !== undefined && vm.$route.query.q !== '') {
                return `https://api.giphy.com/v1/gifs/search?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&q=${vm.searchText}&limit=24&offset=0&rating=G&lang=en&offset=${vm.gifsCount}`;
            }
            return `https://api.giphy.com/v1/gifs/trending?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&limit=24&rating=G&offset=${vm.gifsCount}`;
        },      
        responseType: 'text',
        history: false
    });
    
    infScroll.on( 'load', function( response ) {        
      var data = JSON.parse( response );
      vm.gifs = [...vm.gifs, ...data.data];
    });
  }
}
</script>
