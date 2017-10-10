<template>
  <footer class="footer-container">Copyright &copy; 1998-{{date}} lecykx. All Rights Reserved</footer>
</template>

<script>
  import moment from 'moment'
  
  export default {
    name: 'page-footer',
    data() {
      return {
          date: moment().format('YYYY')
      }
    }
  }
</script>