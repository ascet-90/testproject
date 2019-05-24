<template>
    <div class="container author" v-if="authorData && authorData.user">
        <div class="row top-row v-align">
            <div class="column">
                <div class="logo">
                    <a href="/"><span>LOGO</span></a>                
                </div>
            </div>
            <div class="column column-right">
                <div class="author-gif">
                    <router-link :to="'/gif/'+authorData.gifId">Back To Gif</router-link>                
                </div>
            </div>
        </div> 
        <div class="row">
            <div class="column full-width">
                <h1>{{authorData.user.display_name}}</h1>
                <span class="icon-spin5" v-show="loading"></span>
                <img :src="authorData.user.avatar_url" alt="Author Avatar" @load="onLoad" v-show="!loading">
                <p>Author Profile: <a :href="authorData.user.profile_url">{{authorData.user.username}}</a> </p>
            </div>
        </div>
    </div>      
</template>

<script>    
import Api from '../Api'

export default {
  name: 'author-page',
  data() {
    return {
        loading: true,
        authorData: null
    }   
  },
  mounted: function() {
    var vm = this;
    Api.searchGifById(this.$route.params.gifId, function( res ) {
        vm.authorData = {
            gifId: res.data.id,
            user: res.data.user
        }
    });    
  },
   methods: {
    onLoad: function() {
        this.loading = false;
    }
  }
}
</script>

<style>
    .icon-spin5::before {
        animation: spin 1s infinite linear;
        font-size: 40px;
    }
    .row.v-align {
        display: flex;
        align-items: center;
    }
    .row.v-align .column-right {
        margin-left: auto;
    }
    .gif-single {
        text-align: center;
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg)
        }
    }
</style>