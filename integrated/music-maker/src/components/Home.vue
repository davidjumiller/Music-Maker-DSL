<template>
    <div class="container-fluid vh-100 container-responsive">
        <Header />
        
        <Workbench />
        <div id="footer" class="row gx-0 px-5">
            © 2021 CPSC 410 Team 24. All Rights Reserved.
        </div>
    </div>
</template>

<script>
    import '../assets/styles.css';

    import Header from './Home/Header.vue';
    import Workbench from './Home/Workbench.vue';
    export default {
        name: 'Home',
        components: {
            Header, Workbench
        },
        props: {
        msg: String
        }
    }
</script>
