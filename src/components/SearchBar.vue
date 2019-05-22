<template>
    <div class="search-bar">
        <form action="" @submit.prevent="onSubmit">
            <button class="icon-search" type="submit"></button>
            <input 
                type="search" 
                placeholder="Search" 
                @input="$emit('search-change', $event.target.value)"
                @keyup.enter.native="onSubmit" 
                :value="searchText" 
                autocomplete="on">
        </form>                
    </div>        
</template>

<script>

export default {
  name: 'search-bar',
  props: ['onSubmit', 'searchText']
}
</script>
