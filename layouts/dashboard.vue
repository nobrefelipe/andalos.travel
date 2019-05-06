<template>

  <section class="_dashboard">

    <header class="header">

      <nuxt-link :to="`/dashboard/${$route.params.user}`" >
        <section class="logo"><img src="~/static/img/logo-yellow-bg.png" alt=""> <span>andalos</span></section>
      </nuxt-link>

      <nuxt-link v-if="hideCreate" :to="`/dashboard/${$route.params.user}/itinerary/create/`" class="create-button"><a-icon style="font-size: 20px" type="plus" /> CREATE</nuxt-link>

    </header>


    <section class="main-content">

      <div class="wrapper"><nuxt/></div>

    </section>

  </section>

</template>

<script>
    export default {

        computed:{

            // HIDE THE CREATE BUTTON FOR THE ROUTES BELOW
            hideCreate(){

                return (
                    this.$route.name == "dashboard-user-itinerary-itineraryID" ||
                    this.$route.name == "dashboard-user-itinerary-create") ?
                    false : true;

            }

        }

    }

</script>

<style lang="scss" >

  ._dashboard{

    @import "../assets/scss/_dashboard/dashboard";


    .create-button{

      height: 50px;

      padding: 0 20px;

      display: flex;

      align-items: center;

      justify-content: center;

      transition: all .3s ease;

      i{margin-right: 10px}

      &:hover{

        background: rgba(0,0,0,0.1);

      }

    }

    .logo{

      float: left;

      display: flex;

      align-items: center;

      img{ height: 50px; }

      span{ font-size: 13px; margin-left: 15px; color: #47494e}


    }

    .header{

      position: fixed;

      top: 0; left: 0;

      z-index: 1000;

      background: #fff;

      width: 100vw;

      height: 50px;

      box-shadow: 0 0 4px rgba(0,0,0,0.2);

      display: flex;

      justify-content: space-between;

      align-items: center;


    }


    .main-content{

      float: left;

      width: 100%;

      padding-top: 80px; // 50px header + 30px spacing

      margin-bottom: 80px;

      .wrapper{

        width: 100%;

        max-width: 1200px;

        padding: 0 20px;

        margin: 0 auto;

      }

    }

  }

</style>
