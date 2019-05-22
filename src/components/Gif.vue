<template>
    <transition appear appear-class="slide-enter" appear-to-class="slide-leave-to" appear-active-class="slide-enter-active"> 
        <div class="gif">  
            <a :href="gifData.images.fixed_height.url">
                <img alt="Gif" :src="gifData.images.fixed_height.url" class="img-responsive" @load="onLoad"/>
            </a>            
        </div> 
    </transition>           
</template>

<script>

export default {
  name: 'gif',
  props: ['gifData'],
  data() {
    return {
        loading: true
    }
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
