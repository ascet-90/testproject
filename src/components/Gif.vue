<template>
    <transition appear appear-class="slide-enter" appear-to-class="slide-leave-to" appear-active-class="slide-enter-active"> 
        <div class="gif">  
            <router-link :to="'/gif/'+gifData.id">
                <img alt="Gif" :src="gifData.images.fixed_height.url" class="img-responsive"/>
            </router-link>            
        </div> 
    </transition>           
</template>

<script>

export default {
  name: 'gif',
  props: ['gifData']
}
</script>
