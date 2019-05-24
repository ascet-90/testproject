<template>
    <div class="gif-single" v-if="gifData"> 
        <h1>{{gifData.title}}</h1>
        <span class="icon-spin5" v-show="loading"></span>
        <img :src="gifData.images.downsized.url" alt="Gif Image" @load="loading = false" v-show="!loading">
        <p v-if="gifData.user"> Author: <router-link :to="'/author/'+gifData.id">{{gifData.user.display_name}}</router-link></p>
    </div>        
</template>

<script>    
import Api from '../Api'

export default {
  name: 'gif-single',
  data() {
    return {
        gifData: null,
        loading: true
    }   
  },
  mounted: function() {
    var vm = this;
    Api.searchGifById(this.$route.params.id, function( res ) {
        vm.gifData = res.data;
    });
  }
}
</script>

<style>
    .icon-spin5::before {
        animation: spin 1s infinite linear;
        font-size: 40px;
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