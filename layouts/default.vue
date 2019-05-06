<template>

  <section :class="`${routeName}-page`" >

    <div v-show="!$nuxt.isOnline" class="offline-banner">No internet connection</div>

    <header-component/>

    <section class="main-content">

      <nuxt/>

    </section>

    <footer class="footer">

      <div class="wrapper is-flexy is-center">

        <p>Developed by <a href="https://www.linkedin.com/in/felipe-nobre/" title="Felipe Nobre" target="_blank"> Felipe Nobre</a></p>

      </div>

    </footer>

  </section>

</template>

<script>

  import HeaderComponent from "@/components/header";

  export default {

      components: { HeaderComponent },

      computed:{

          isOffline(){
              return this.$nuxt.isOffline;
          },
          routeName(){ return this.$route.name; }

      }

  }
</script>

<style  lang="scss">

  @import "../assets/scss/style";


  .offline-banner{

    position: fixed;

    top: 0;

    left: 0;

    width: 100vw;

    font-size: 12px;

    background-color: red;

    color: #fff;

    text-align: center;

    z-index: 999999;

  }

  .isOffline{

    padding-top: 17px;

    .header{top: 17px !important;}

    .offline-banner{display: block !important;}

  }

  .footer{

    float: left;

    width: 100%;

    padding: 40px 0;

    font-size: 12px;

    text-align: center;

    a{

      color: #666;

      font-weight: bold;

      &:hover{ text-decoration: underline}

    }

  }

</style>

